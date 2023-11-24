import supabase from "../utils/supabase";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/options";
import imageSize from "image-size";
import { redirect } from "next/navigation";

export default async function UploadForm() {
  const UploadFile = async (formData: FormData) => {
    "use server";
    const file = formData.get("file") as File;
    const title = formData.get("title");
    const description = formData.get("description");
    const tag = formData.get("tag");
    const bucket = "Images";
    const imageTable = "Image";
    const tagTable = "Tag";
    const tagToImage = "TagToImage";
    const session = await getServerSession(nextAuthOptions);
    const userId = session?.user?.id;
    const tagInput = formData.get("tag") as string;
    const tags = tagInput
      .split(" ")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    // 選択された画像ファイルをバッファーに変換
    const fileBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(new Uint8Array(fileBuffer));
    const dimensions = imageSize(buffer);
    const width = dimensions.width;
    const height = dimensions.height;

    const { error: storageError } = await supabase.storage
      .from(bucket)
      .upload(file.name, file);

    if (storageError) {
      console.error("ストレージエラー:", storageError);
    } else {
      console.log("ファイルをストレージにアップロードしました");
    }

    // 画像のURLを取得
    const { data: imageData } = await supabase.storage
      .from(bucket)
      .getPublicUrl(file.name);
    const imageUrl = imageData.publicUrl;

    // 画像のURL、タイトル、および概要をDBに保存
    const { data: imageTableData, error: imageTableError } = await supabase
      .from(imageTable)
      .insert([
        {
          url: imageUrl,
          userId: userId,
          title: title,
          description: description,
          width: width,
          height: height,
        },
      ])
      .select();
    const imageId = imageTableData?.[0]?.id;

    if (imageTableError) {
      console.error("imageテーブルエラー:", imageTableError);
    } else {
      console.log("imageテーブルにデータを挿入しました。");
    }

    const { data: tagTableData, error: tagTableError } = await supabase
      .from(tagTable)
      .upsert(tags.map((tagName) => ({ tagName })))
      .select();
    const tagIds = tagTableData?.map((tag) => tag.id) || [];

    if (tagTableError) {
      console.error("tagテーブルエラー:", tagTableError);
    } else {
      console.log("tagテーブルにデータを挿入しました。");
    }

    const { error: tagToImageError } = await supabase.from(tagToImage).insert(
      tagIds.map((tagId) => ({
        imageId: imageId,
        tagId: tagId,
      }))
    );

    if (tagToImageError) {
      console.error("tagToImageテーブルエラー:", tagToImageError.message);
    } else {
      console.log("TagToImageテーブルにデータを挿入しました。");
      redirect("dashboard");
    }
  };

  return (
    <form action={UploadFile} className="max-w-lg mx-auto mt-8 p-4">
      <h1 className="text-2xl font-semibold mb-4">画像をアップロード</h1>
      <div className="mb-4">
        <label htmlFor="file" className="border p-2 cursor-pointer">
          イラストを選択
        </label>
        <input
          type="file"
          name="file"
          id="file"
          accept="image/*"
          className="border p-2"
          hidden
        />
      </div>
      <div className="mb-4">
        <input
          type="text"
          name="title"
          placeholder="タイトル"
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <textarea
          name="description"
          placeholder="概要"
          className="border p-2 w-full h-24"
        />
      </div>
      <div className="mb-4 flex items-center justify-between">
        <input name="tag" placeholder="タグ (空白で複数設定可能です)" className="border p-2 flex-grow" />
        <div className="aspect-square">
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        アップロード
      </button>
    </form>
  );
}

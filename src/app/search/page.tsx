"use client"

import { useSearchParams } from 'next/navigation';
import supabase from '../utils/supabase';


export default async function SearchResult() {
  const searchParams = useSearchParams();
  const search = searchParams.get('keyword')

  const { data, error } = await supabase
  .from("Image")
  .select("*")
  .filter('title', 'ilike', `%${search}%`);
  
    return(
    <>
    <p>検索ワード:{search}</p>
    <div>
        {data && data.map(item => (
          <div key={item.id}>
            <p>{item.title}</p>
            {/* Render other properties as needed */}
          </div>
        ))}
      </div>
    </>
  )
}
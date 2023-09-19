import Link from 'next/link'

export default function NotFound() {
    return(
        <>
            <div className='text-xl'>このページは存在しません</div>
            <Link className='underline hover:text-blue-500' href="/">ホームへ戻る</Link>
        </>
    )
}
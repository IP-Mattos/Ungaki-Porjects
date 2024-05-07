import Link from 'next/link'

export function NavLink({ link, name }: { link: string; name: string }) {
  return (
    <div>
      <Link className='border-white hover:border-b ' href={link}>
        {name}
      </Link>
    </div>
  )
}

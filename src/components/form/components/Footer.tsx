import Link from 'next/link'

interface FooterProps {
  description: string
  textLink: string
  link: string
}
export function Footer({ description, textLink, link }: FooterProps) {
  return (
    <footer className='w-full flex justify-center mt-3'>
      <span className='text-[12px]'>
        {description}
        <Link href={link} className='font-bold px-2'>
          {textLink}
        </Link>
      </span>
    </footer>
  )
}

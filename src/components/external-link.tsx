const ExternalLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a className='text-indigo-400' href={href} target='_blank' rel='noopener noreferrer'>
      {children}
    </a>
  );
};

export default ExternalLink;

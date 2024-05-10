import { useState } from 'react';
import { Container, Group, Burger, Image } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import  Logo  from '@/assets/images/logo.png';
import classes from './Header.module.css';
import { Link, useNavigate } from 'react-router-dom';

const links = [
  { link: '/', label: 'Home' },
  { link: '/nearbycities', label: 'Nearby cities' },
  { link: '/learn', label: 'Attraction' },
  { link: '/community', label: 'Community' },
];

export default function HeaderSimple() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState(links[0].link);
  const navigate = useNavigate();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className="block leading-none px-[8px] py-[12px] rounded-sm text-slate-950 text-base font-medium hover:bg-slate-300"
      data-active={active === link.link || undefined}
      onClick={() => {
        navigate(link.link)
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <header className="h-14 bg-slate-400 border-r border-slate-400">
      <Container size="md" className={classes.inner}>
        <Link to={'/'} className='w-[50px] h-[50px] rounded-lg'>
          <Image src={Logo} radius="lg" h={50} w={80} className='cursor-pointer'/>
        </Link>
        <Group gap={10} visibleFrom="sm">
          {items}
        </Group>

        <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
      </Container>
    </header>
  );
}
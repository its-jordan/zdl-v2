'use client';

import Link from 'next/link';
import { BsDiscord, BsPersonFill } from 'react-icons/bs';
import { MdOutlineCatchingPokemon } from 'react-icons/md';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import navLinks, {
  seasonLinks,
  currentSeason,
  // tradesActive,
} from '@/data/links';
import { useCategory } from '@/components/standalone/CategoryContext';
import { useRouter, usePathname } from 'next/navigation';

interface MenuLinkProps {
  trigger: string;
  path: string;
  children?: React.ReactNode;
}

function MenuLink({ trigger, children, path }: MenuLinkProps) {
  return (
    <>
      {children ? (
        <NavigationMenuItem>
          <NavigationMenuTrigger>{trigger}</NavigationMenuTrigger>
          {children}
        </NavigationMenuItem>
      ) : (
        <Link href={path} legacyBehavior passHref>
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            {trigger}
          </NavigationMenuLink>
        </Link>
      )}
    </>
  );
}

const Navbar = () => {
  const { selectedCategory, setSelectedCategory } = useCategory();
  const router = useRouter();
  const pathname = usePathname();

  const handleCategoryChange = (newCategory: string) => {
    setSelectedCategory(newCategory);
    const currentPath = pathname.split('/').slice(2).join('/');
    const currentTeam = pathname.split('/').slice(3).join('/');
    console.log(currentTeam);
    if (pathname !== '/' && !pathname.includes('/teams/')) {
      const newPath = `/${newCategory}/${currentPath}`;
      router.push(newPath);
    }
    // console.log(navLinks(newCategory)[2].subpaths[0].title);
  };

  return (
    <div className='navbar'>
      <div className='internal-nav-container'>
        <div className='draft-league-logo'>
          <div className='draft-league-text'>ZDL</div>
          <div className='hover_only'>
            {selectedCategory.charAt(0).toUpperCase() +
              selectedCategory.split('-')[0].slice(1) +
              ' ' +
              selectedCategory.split('-')[1]}
          </div>
        </div>
        <NavigationMenu className='navigation-list-container'>
          <NavigationMenuList>
            {navLinks(selectedCategory).map((link, index) => {
              if (link.subpaths !== undefined) {
                return (
                  <MenuLink key={index} trigger={link.title} path={link.path}>
                    <NavigationMenuContent className='navigation-links-container'>
                      <div className='navbar_sublink_container'>
                        {link.subpaths.map((team: any, index: number) => (
                          <Link
                            className='navbar_sublink_item'
                            key={index}
                            href={team.path}>
                            <img
                              className='navbar_sublink_avatar'
                              src={team.avatar}
                              width={50}
                              height={50}
                              alt={team.title}
                            />
                            <div>
                              <div className='navbar_sublink_teamname'>
                                {team.name}
                              </div>
                              <div className='navbar_sublink_info navbar_sublink_team'>
                                <BsPersonFill />
                                <div>{team.title}</div>
                              </div>
                              <div className='navbar_sublink_info navbar_sublink_showdown'>
                                <MdOutlineCatchingPokemon />
                                <div>{team.showdown}</div>
                              </div>
                              <div className='navbar_sublink_info navbar_sublink_discord'>
                                <BsDiscord />
                                <div>{team.discord}</div>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </MenuLink>
                );
              }
              return (
                <>
                  {selectedCategory == 'season-3' && link.title == 'Trades' ? (
                    <></>
                  ) : (
                    <MenuLink
                      key={index}
                      trigger={link.title}
                      path={link.path}
                    />
                  )}
                </>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
        <div className='navigation-season-container'>
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger className='w-[200px]'>
              <SelectValue placeholder={currentSeason} />
            </SelectTrigger>
            <SelectContent>
              {seasonLinks.map((season, index) => (
                <SelectItem
                  key={index}
                  value={season.value}
                  disabled={season.disabled}>
                  {season.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

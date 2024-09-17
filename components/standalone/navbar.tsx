'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import navLinks, { seasonLinks, currentSeason } from '@/data/links';
import Link from 'next/link';
import Image from 'next/image';
import { BsDiscord, BsPersonFill } from 'react-icons/bs';
import { MdOutlineCatchingPokemon } from 'react-icons/md';

interface menuLink {
  trigger: string;
  path: string;
  children?: React.ReactNode;
}

type NavigationCategory = keyof typeof navLinks;

function MenuLink({ trigger, children, path }: menuLink) {
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
  const [selectedCategory, setSelectedCategory] =
    useState<NavigationCategory>('offseason-2');
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
            {navLinks[selectedCategory].map((link, index) => {
              if (link.subpaths !== undefined) {
                return (
                  <MenuLink key={index} trigger={link.title} path={link.path}>
                    <NavigationMenuContent className='navigation-links-container'>
                      <div className='navbar_sublink_container'>
                        {link.subpaths.map((team, index) => {
                          return (
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
                          );
                        })}
                      </div>
                    </NavigationMenuContent>
                  </MenuLink>
                );
              }
              return (
                <MenuLink
                  key={index}
                  trigger={link.title}
                  path={link.path}></MenuLink>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>
        <div className='navigation-season-container'>
          <Select
            value={selectedCategory}
            onValueChange={(value: NavigationCategory) =>
              setSelectedCategory(value)
            }>
            <SelectTrigger className='w-[200px]'>
              <SelectValue placeholder={currentSeason} />
            </SelectTrigger>
            <SelectContent>
              {seasonLinks.map((season, index) => {
                return (
                  <SelectItem
                    key={index}
                    value={season.value}
                    disabled={season.disabled}>
                    {season.title}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

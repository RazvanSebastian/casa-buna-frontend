import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTreeModule } from '@angular/material/tree';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserState } from '../../../../user/state/user.state';
import { RoleName } from '../../../model/user.model';
import { NavListItem } from './model';

@Component({
  imports: [
    CommonModule,
    MatTreeModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
  ],
  selector: 'app-nav-list',
  styleUrl: './nav-list.scss',
  templateUrl: './nav-list.html',
})
export class NavList {
  private readonly store = inject(Store);

  private readonly userRoles =
    this.store.selectSnapshot(UserState.getRoles)?.map((role) => role.name) ?? [];

  protected readonly childrenAccessor = (node: NavListItem) => node.children ?? [];
  protected readonly hasChild = (_: number, node: NavListItem) =>
    !!node.children && node.children.length > 0;

  private readonly NAV_LIST_TEMPLATE: NavListItem[] = [
    {
      name: 'Home',
      route: ['home'],
      icon: 'home',
      isVisible: true,
    },
    {
      name: 'Administratie',
      route: ['administration'],
      icon: 'admin',
      isVisible: this.isVisible([RoleName.ROLE_ADMIN]),
      children: [
        {
          name: 'Utilizatori',
          route: ['users'],
          icon: 'person',
          isVisible: true,
        },
        {
          name: 'Cereri voluntariat',
          route: ['volunteer-requests'],
          icon: 'requests',
          isVisible: true,
        },
      ],
    },
  ];

  protected readonly visibleNavList = this.prepareNavListItems(this.NAV_LIST_TEMPLATE);

  private prepareNavListItems(items: NavListItem[], parentRoute: string[] = []): NavListItem[] {
    return items
      .filter((item) => item.isVisible)
      .map((item) => {
        const route = [...parentRoute, ...item.route];
        return {
          ...item,
          route,
          children: item.children ? this.prepareNavListItems(item.children, route) : undefined,
        };
      })
      .filter((item) => !item.children || item.children.length > 0 || !item.route);
  }

  private isVisible(roles: RoleName[]) {
    return roles.some((role) => this.userRoles.includes(role));
  }
}

// components/users/UserMainView.js
import { BaseComponent } from 'base';
import { UserViewModel } from './UserViewModel.js';
import { UserListTemplate } from './UserListView.js';
import { UserDetailTemplate } from './UserDetailView.js';

export class UserMainView extends BaseComponent {
    constructor() {
        super();
        this.vm = new UserViewModel(this);
        this.state = {
            viewMode: 'list',
            users: [],
            filteredUsers: [],
            selectedUser: null,
            loading: true,
            error: null
        };
    }

    connectedCallback() {
        this.vm.loadUsers();
    }

    afterRender() {
        const root = this.querySelector('.users-view-root');
        if (!root) return;

        if (root.dataset.listenersBound === 'true') return;
        root.dataset.listenersBound = 'true';

        root.addEventListener('input', (e) => {
            const target = e.target;
            if (!(target instanceof HTMLInputElement)) return;
            if (target.matches('[data-action="filter"]')) {
                this.vm.filterUsers(target.value);
            }
        });

        root.addEventListener('click', (e) => {
            const el = e.target instanceof Element ? e.target.closest('[data-action]') : null;
            if (!el) return;
            const action = el.getAttribute('data-action');

            if (action === 'select') {
                const id = el.getAttribute('data-id');
                if (id) this.vm.selectUser(id);
                return;
            }

            if (action === 'back') {
                this.vm.goToList();
            }
        }, { capture: true });
    }

    render() {
        if (this.state.loading) {
            this.innerHTML = `
                <div class="users-view-root">
                    <div style="padding: 16px;">로딩 중...</div>
                </div>
            `;
            return;
        }

        if (this.state.error) {
            this.innerHTML = `
                <div class="users-view-root">
                    <div style="padding: 16px; color: #c0392b;">
                        데이터를 불러오는 중 오류가 발생했습니다: ${String(this.state.error)}
                    </div>
                </div>
            `;
            return;
        }

        this.innerHTML = `
            <div class="users-view-root">
                ${this.state.viewMode === 'list'
                    ? UserListTemplate(this.state.filteredUsers)
                    : UserDetailTemplate(this.state.selectedUser)
                }
            </div>
        `;
    }
}

if (!customElements.get('inventory-users')) {
    customElements.define('inventory-users', UserMainView);
}


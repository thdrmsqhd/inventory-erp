// components/users/UserMainView.js
import { BaseComponent } from 'base';
import { UserViewModel } from './UserViewModel.js';
import { UserListTemplate } from './UserListView.js';
import { UserDetailTemplate } from './UserDetailView.js';
import { UserFormTemplate } from './UserFormView.js';

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

            if (action === 'create') {
                this.vm.goToForm();
                return;
            }

            if (action === 'edit') {
                this.vm.goToForm(this.state.selectedUser);
                return;
            }

            if (action === 'delete') {
                const id = el.getAttribute('data-id');
                if (id) this.vm.deleteUser(id);
                return;
            }

            if (action === 'back') {
                this.vm.goToList();
            }
        }, { capture: true });

        root.addEventListener('submit', (e) => {
            const form = e.target;
            if (!(form instanceof HTMLFormElement)) return;
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            this.vm.saveUser(data);
        });
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

        let content = '';
        if (this.state.viewMode === 'list') {
            content = UserListTemplate(this.state.filteredUsers);
        } else if (this.state.viewMode === 'detail') {
            content = UserDetailTemplate(this.state.selectedUser);
        } else if (this.state.viewMode === 'form') {
            content = UserFormTemplate(this.state.selectedUser);
        }

        this.innerHTML = `
            <div class="users-view-root">
                ${content}
            </div>
        `;
    }
}

if (!customElements.get('inventory-users')) {
    customElements.define('inventory-users', UserMainView);
}


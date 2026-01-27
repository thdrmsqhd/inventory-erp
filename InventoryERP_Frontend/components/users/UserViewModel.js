export class UserViewModel {
    constructor(view) {
        this.view = view;
    }

    async loadUsers() {
        this.view.setState({ loading: true, error: null });

        // 나중에 예: const users = await this.view.fetchAPI('/api/users');
        const mockUsers = [
            { id: 'USR-001', name: '홍길동', role: '관리자', department: '운영', email: 'hong@example.com', phone: '010-1111-2222', status: '활성' },
            { id: 'USR-002', name: '이순신', role: '창고관리자', department: '물류', email: 'lee@example.com', phone: '010-3333-4444', status: '활성' },
            { id: 'USR-003', name: '김철수', role: '영업', department: '영업', email: 'kim@example.com', phone: '010-5555-6666', status: '비활성' }
        ];

        try {
            this.view.setState({
                users: mockUsers,
                filteredUsers: mockUsers,
                loading: false,
                error: null
            });
        } catch (e) {
            this.view.setState({ loading: false, error: e?.message ?? String(e) });
        }
    }

    filterUsers(keyword) {
        const { users } = this.view.state;
        const list = Array.isArray(users) ? users : [];

        const q = (keyword ?? '').trim().toLowerCase();
        if (!q) {
            this.view.setState({ filteredUsers: list });
            return;
        }

        const filtered = list.filter(u => {
            const id = String(u?.id ?? '').toLowerCase();
            const name = String(u?.name ?? '').toLowerCase();
            const email = String(u?.email ?? '').toLowerCase();
            const dept = String(u?.department ?? '').toLowerCase();
            const role = String(u?.role ?? '').toLowerCase();
            return id.includes(q) || name.includes(q) || email.includes(q) || dept.includes(q) || role.includes(q);
        });

        this.view.setState({ filteredUsers: filtered });
    }

    async selectUser(userId) {
        const { users } = this.view.state;
        const list = Array.isArray(users) ? users : [];
        const selectedUser = list.find(u => u.id === userId);

        if (!selectedUser) {
            this.view.setState({
                viewMode: 'list',
                selectedUser: null,
                error: `선택한 사용자(${String(userId)})를 찾을 수 없습니다.`
            });
            return;
        }

        this.view.setState({
            viewMode: 'detail',
            selectedUser,
            error: null
        });
    }

    goToList() {
        this.view.setState({ viewMode: 'list', selectedUser: null });
    }
}


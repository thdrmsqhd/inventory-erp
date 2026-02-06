export class UserViewModel {
    constructor(view) {
        this.view = view;
    }

    async loadUsers() {
        this.view.setState({ loading: true, error: null });

        const mockUsers = [
            { id: 'USR-001', name: '홍길동', role: 'Master', department: '운영본부', email: 'hong@example.com', phone: '010-1111-2222', status: '활성' },
            { id: 'USR-002', name: '이순신', role: 'Operator', department: '물류팀', email: 'lee@example.com', phone: '010-3333-4444', status: '활성' },
            { id: 'USR-003', name: '김철수', role: 'Viewer', department: '영업팀', email: 'kim@example.com', phone: '010-5555-6666', status: '비활성' },
            { id: 'USR-004', name: '박민지', role: 'Operator', department: '운영본부', email: 'park@example.com', phone: '010-7777-8888', status: '대기' }
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

    goToForm(user = null) {
        this.view.setState({
            viewMode: 'form',
            selectedUser: user
        });
    }

    async saveUser(formData) {
        const { users } = this.view.state;
        const list = Array.isArray(users) ? [...users] : [];
        const index = list.findIndex(u => u.id === formData.id);

        if (index > -1) {
            list[index] = { ...list[index], ...formData };
        } else {
            list.unshift(formData);
        }

        this.view.setState({
            users: list,
            filteredUsers: list,
            viewMode: 'list',
            selectedUser: null
        });
    }

    async deleteUser(id) {
        if (!confirm('이 사용자를 삭제하시겠습니까? 데이터 정합성을 위해 가급적 "비활성" 상태로 변경하는 것을 권장합니다.')) return;

        const { users } = this.view.state;
        const list = Array.isArray(users) ? users.filter(u => u.id !== id) : [];

        this.view.setState({
            users: list,
            filteredUsers: list,
            viewMode: 'list',
            selectedUser: null
        });
    }
}


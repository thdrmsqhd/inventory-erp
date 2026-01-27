// components/users/UserListView.js
export const UserListTemplate = (users) => {
    const list = Array.isArray(users) ? users : [];

    return `
        <style>
            .list-card { background: white; border-radius: 12px; padding: 25px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
            .user-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            .user-table th, .user-table td { padding: 15px; text-align: left; border-bottom: 1px solid #eee; }
            .row-item { cursor: pointer; transition: 0.2s; }
            .row-item:hover { background: #f1f8ff; color: #3498db; }
            .search-bar { margin-bottom: 20px; padding: 10px; width: 100%; border: 1px solid #ddd; border-radius: 6px; }
        </style>
        <div class="list-card">
            <h3>사용자 목록</h3>
            <input type="text" class="search-bar" placeholder="사용자 검색..." data-action="filter">
            <table class="user-table">
                <thead><tr><th>코드</th><th>이름</th><th>부서</th><th>권한</th><th>상태</th></tr></thead>
                <tbody>
                    ${list.map(u => `
                        <tr class="row-item" data-action="select" data-id="${String(u?.id ?? '')}">
                            <td><strong>${String(u?.id ?? '')}</strong></td>
                            <td>${String(u?.name ?? '')}</td>
                            <td>${String(u?.department ?? '')}</td>
                            <td>${String(u?.role ?? '')}</td>
                            <td>${String(u?.status ?? '')}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
};


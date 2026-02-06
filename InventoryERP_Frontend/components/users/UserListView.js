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
            .badge { padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: bold; }
            .badge-master { background: #e74c3c; color: white; }
            .badge-operator { background: #3498db; color: white; }
            .badge-viewer { background: #95a5a6; color: white; }
            .status-active { color: #2ecc71; }
            .status-inactive { color: #95a5a6; text-decoration: line-through; }
            .status-pending { color: #f1c40f; font-weight: bold; }
        </style>
        <div class="list-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3 style="margin: 0;">사용자 관리</h3>
                <button class="btn-create" data-action="create" style="background: #2ecc71; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: bold;">
                    <i class="fas fa-user-plus"></i> 사용자 추가
                </button>
            </div>
            <input type="text" class="search-bar" placeholder="이름, 부서, 이메일로 검색..." data-action="filter">
            <table class="user-table">
                <thead><tr><th>코드</th><th>이름</th><th>부서</th><th>등급</th><th>상태</th></tr></thead>
                <tbody>
                    ${list.map(u => {
                        const role = String(u?.role ?? '');
                        const roleCls = role === 'Master' ? 'badge-master' : (role === 'Operator' ? 'badge-operator' : 'badge-viewer');
                        const status = String(u?.status ?? '');
                        const statusCls = status === '활성' ? 'status-active' : (status === '대기' ? 'status-pending' : 'status-inactive');
                        
                        return `
                            <tr class="row-item" data-action="select" data-id="${String(u?.id ?? '')}">
                                <td><code>${String(u?.id ?? '')}</code></td>
                                <td><strong>${String(u?.name ?? '')}</strong></td>
                                <td>${String(u?.department ?? '')}</td>
                                <td><span class="badge ${roleCls}">${role}</span></td>
                                <td><span class="${statusCls}">${status}</span></td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
};


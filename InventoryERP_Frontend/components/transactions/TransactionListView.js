// components/transactions/TransactionListView.js
export const TransactionListTemplate = (transactions) => {
    const list = Array.isArray(transactions) ? transactions : [];

    return `
        <style>
            .list-card { background: white; border-radius: 12px; padding: 25px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
            .tx-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            .tx-table th, .tx-table td { padding: 15px; text-align: left; border-bottom: 1px solid #eee; }
            .row-item { cursor: pointer; transition: 0.2s; }
            .row-item:hover { background: #f1f8ff; color: #3498db; }
            .search-bar { margin-bottom: 20px; padding: 10px; width: 100%; border: 1px solid #ddd; border-radius: 6px; }
            .badge { padding: 2px 8px; border-radius: 10px; font-size: 0.8rem; color: white; }
            .in { background: #2ecc71; }
            .out { background: #e74c3c; }
        </style>
        <div class="list-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3 style="margin: 0;">입/출고 목록</h3>
                <button class="btn-create" data-action="create" style="background: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: bold;">
                    <i class="fas fa-plus"></i> 신규 등록
                </button>
            </div>
            <input type="text" class="search-bar" placeholder="입/출고 검색..." data-action="filter">
            <table class="tx-table">
                <thead><tr><th>입/출고ID</th><th>날짜</th><th>유형</th><th>품목</th><th>수량</th><th>창고</th><th>작업자</th></tr></thead>
                <tbody>
                    ${list.map(t => {
                        const type = String(t?.type ?? '');
                        const cls = type === '입고' ? 'in' : (type === '출고' ? 'out' : '');
                        return `
                            <tr class="row-item" data-action="select" data-id="${String(t?.id ?? '')}">
                                <td><strong>${String(t?.id ?? '')}</strong></td>
                                <td>${String(t?.date ?? '')}</td>
                                <td><span class="badge ${cls}">${type}</span></td>
                                <td>${String(t?.itemName ?? '')} (${String(t?.itemId ?? '')})</td>
                                <td>${Number(t?.qty ?? 0).toLocaleString()}</td>
                                <td>${String(t?.warehouse ?? '')}</td>
                                <td>${String(t?.worker ?? '')}</td>
                            </tr>
                        `;
                    }).join('')}
                </tbody>
            </table>
        </div>
    `;
};


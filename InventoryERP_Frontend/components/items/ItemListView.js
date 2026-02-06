// components/items/ItemListView.js
export const ItemListTemplate = (items) => {
    const list = Array.isArray(items) ? items : [];
    return `
        <style>
            .list-card { background: white; border-radius: 12px; padding: 25px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
            .item-table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            .item-table th, .item-table td { padding: 15px; text-align: left; border-bottom: 1px solid #eee; }
            .row-item { cursor: pointer; transition: 0.2s; }
            .row-item:hover { background: #f1f8ff; color: #3498db; }
            .search-bar { margin-bottom: 20px; padding: 10px; width: 100%; border: 1px solid #ddd; border-radius: 6px; }
        </style>
        <div class="list-card">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3 style="margin: 0;">품목 목록</h3>
                <button class="btn-create" data-action="create" style="background: #2ecc71; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: bold;">
                    <i class="fas fa-plus"></i> 신규 품목 등록
                </button>
            </div>
            <input type="text" class="search-bar" placeholder="품목 검색..." data-action="filter">
            <table class="item-table">
                <thead><tr><th>코드</th><th>품목명</th><th>카테고리</th><th>재고</th></tr></thead>
                <tbody>
                    ${list.map(item => `
                        <tr class="row-item" data-action="select" data-id="${String(item?.id ?? '')}">
                            <td><strong>${String(item?.id ?? '')}</strong></td>
                            <td>${String(item?.name ?? '')}</td>
                            <td>${String(item?.category ?? '')}</td>
                            <td>${Number(item?.stock ?? 0).toLocaleString()}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
};

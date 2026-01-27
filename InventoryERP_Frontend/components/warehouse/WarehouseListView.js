// components/warehouse/WarehouseListView.js
export const WarehouseListTemplate = (warehouses, vm) => {
    const list = Array.isArray(warehouses) ? warehouses : [];

    return `
        <style>
            .list-card { background: white; border-radius: 12px; padding: 25px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
            .search-bar { margin-bottom: 20px; padding: 10px; width: 100%; border: 1px solid #ddd; border-radius: 6px; }
            .grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                gap: 20px;
            }
            .wh-card {
                background: white;
                border-radius: 12px;
                padding: 20px;
                box-shadow: 0 4px 10px rgba(0,0,0,0.05);
                border-top: 5px solid #3498db;
            }
            .wh-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px; }
            .wh-name { font-size: 1.1rem; font-weight: bold; color: #2c3e50; }
            .wh-type { font-size: 0.8rem; padding: 3px 8px; background: #eee; border-radius: 4px; }
            .wh-info { font-size: 0.9rem; color: #7f8c8d; margin-bottom: 20px; }
            .wh-info i { margin-right: 5px; width: 15px; }
            .capacity-label { display: flex; justify-content: space-between; font-size: 0.85rem; margin-bottom: 8px; }
            .progress-bar { width: 100%; height: 10px; background: #ecf0f1; border-radius: 5px; overflow: hidden; }
            .progress-fill { height: 100%; transition: width 0.5s ease-in-out; }
            .btn-detail {
                width: 100%; margin-top: 15px; padding: 10px;
                background: #f8f9fa; border: 1px solid #ddd; border-radius: 6px;
                cursor: pointer; transition: 0.2s;
            }
            .btn-detail:hover { background: #3498db; color: white; border-color: #3498db; }
        </style>

        <div class="list-card">
            <h3>창고 목록</h3>
            <input type="text" class="search-bar" placeholder="창고 검색..." data-action="filter">

            <div class="grid">
                ${list.map(wh => {
                    const cap = Number(wh?.capacity ?? 0);
                    const color = vm?.getCapacityColor ? vm.getCapacityColor(cap) : '#3498db';
                    return `
                        <div class="wh-card" style="border-top-color: ${color}">
                            <div class="wh-header">
                                <span class="wh-name">${String(wh?.name ?? '')}</span>
                                <span class="wh-type">${String(wh?.type ?? '')}</span>
                            </div>
                            <div class="wh-info">
                                <div><i class="fas fa-id-badge"></i> ${String(wh?.id ?? '')}</div>
                                <div><i class="fas fa-map-marker-alt"></i> ${String(wh?.location ?? '')}</div>
                            </div>
                            <div class="capacity-section">
                                <div class="capacity-label">
                                    <span>가동률</span>
                                    <span style="color: ${color}; font-weight: bold;">${cap}%</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${Math.min(100, Math.max(0, cap))}%; background: ${color};"></div>
                                </div>
                            </div>
                            <button class="btn-detail" data-action="select" data-id="${String(wh?.id ?? '')}">
                                상세 보기
                            </button>
                        </div>
                    `;
                }).join('')}
            </div>
        </div>
    `;
};


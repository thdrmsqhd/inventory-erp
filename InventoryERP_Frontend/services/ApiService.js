export class ApiService {
    static async fetchNavigation() {
        try {
            const response = await fetch('/api/navigation');
            if (!response.ok) {
                throw new Error(`navigation response ${response.status}`);
            }
            const payload = await response.json();
            if (Array.isArray(payload?.menus)) {
                return payload.menus;
            }
            return payload;
        } catch (error) {
            console.warn('ApiService.fetchNavigation fallback', error);
            return [
                { title: '대시보드', icon: 'fas fa-chart-line', tag: 'inventory-dashboard', badge: 'overview' },
                { title: '창고관리', icon: 'fas fa-warehouse', tag: 'inventory-warehouse', badge: 'storage' },
                { title: '품목관리', icon: 'fas fa-boxes-stacked', tag: 'inventory-items', badge: 'catalog' },
                { title: '입/출고관리', icon: 'fas fa-exchange-alt', tag: 'inventory-transactions', badge: 'flow' },
                { title: '사용자관리', icon: 'fas fa-users-cog', tag: 'inventory-users', badge: 'people' }
            ];
        }
    }

    static async fetchSaveWarehouse(warehouseData) {
        try {
            const response = await fetch('/api/warehouses', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(warehouseData)
            });
            
            if (!response.ok) {
                throw new Error(`Server responded with ${response.status}`);
            }
            
            // 백엔드에서 저장된 데이터 또는 전체 목록을 반환한다고 가정
            return await response.json();
        } catch (error) {
            console.error('ApiService.fetchSaveWarehouse error', error);
            return null;
        }
    }
}


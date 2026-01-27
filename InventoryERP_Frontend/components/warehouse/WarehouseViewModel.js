export class WarehouseViewModel {
    constructor(view) {
        this.view = view;
    }

    // 창고 데이터 로드 (Poco API 연동 전 임시)
    async loadWarehouses() {
        this.view.setState({ loading: true, error: null });
        // 나중에 예: await this.view.fetchAPI('/api/warehouses');
        const mockWarehouses = [
            { id: 'WH-001', name: '서울 1번 창고', location: '서울특별시', capacity: 85, type: '일반' },
            { id: 'WH-002', name: '서울 2번 창고', location: '서울 강남구', capacity: 40, type: '일반' },
            { id: 'WH-003', name: '인천 창고', location: '인천광역시', capacity: 15, type: '냉장' },
            { id: 'WH-004', name: '부산 창고', location: '부산광역시', capacity: 92, type: '위험' }
        ];

        try {
            this.view.setState({ 
                warehouses: mockWarehouses,
                filteredWarehouses: mockWarehouses,
                loading: false,
                error: null
            });
        } catch (e) {
            this.view.setState({ loading: false, error: e?.message ?? String(e) });
        }
    }

    filterWarehouses(keyword) {
        const { warehouses } = this.view.state;
        const list = Array.isArray(warehouses) ? warehouses : [];

        const q = (keyword ?? '').trim().toLowerCase();
        if (!q) {
            this.view.setState({ filteredWarehouses: list });
            return;
        }

        const filtered = list.filter(wh => {
            const id = String(wh?.id ?? '').toLowerCase();
            const name = String(wh?.name ?? '').toLowerCase();
            const location = String(wh?.location ?? '').toLowerCase();
            const type = String(wh?.type ?? '').toLowerCase();
            return id.includes(q) || name.includes(q) || location.includes(q) || type.includes(q);
        });

        this.view.setState({ filteredWarehouses: filtered });
    }

    selectWarehouse(warehouseId) {
        const { warehouses } = this.view.state;
        const list = Array.isArray(warehouses) ? warehouses : [];
        const selectedWarehouse = list.find(w => w.id === warehouseId);

        if (!selectedWarehouse) {
            this.view.setState({
                viewMode: 'list',
                selectedWarehouse: null,
                error: `선택한 창고(${String(warehouseId)})를 찾을 수 없습니다.`
            });
            return;
        }

        this.view.setState({
            viewMode: 'detail',
            selectedWarehouse,
            error: null
        });
    }

    goToList() {
        this.view.setState({ viewMode: 'list', selectedWarehouse: null });
    }

    // 가동률(점유율)에 따른 색상 반환
    getCapacityColor(percent) {
        if (percent >= 90) return '#e74c3c'; // 높음 (Red)
        if (percent >= 70) return '#f39c12'; // 보통 (Orange)
        return '#2ecc71'; // 낮음 (Green)
    }
}

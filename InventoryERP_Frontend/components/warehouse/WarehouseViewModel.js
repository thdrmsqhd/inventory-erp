export class WarehouseViewModel {
    constructor(view) {
        this.view = view;
    }

    async loadWarehouses() {
        this.view.setState({ loading: true, error: null });
        try {
            // 실제 API 구현 전까지는 Mock 데이터 사용
            const mockData = [
                { id: 'WH-001', name: '서울 1번 창고', location: '서울특별시', type: '일반', capacity: 85 },
                { id: 'WH-002', name: '서울 2번 창고', location: '서울 강남구', type: '일반', capacity: 40 },
                { id: 'WH-003', name: '인천 창고', location: '인천광역시', type: '냉장', capacity: 15 },
                { id: 'WH-004', name: '부산 창고', location: '부산광역시', type: '위험', capacity: 92 },
            ];
            
            this.view.setState({
                warehouses: mockData,
                filteredWarehouses: mockData,
                loading: false
            });
        } catch (err) {
            this.view.setState({ error: '데이터를 불러오는데 실패했습니다.', loading: false });
        }
    }

    filterWarehouses(query) {
        const { warehouses } = this.view.state;
        const filtered = warehouses.filter(wh => 
            wh.name.toLowerCase().includes(query.toLowerCase()) ||
            wh.id.toLowerCase().includes(query.toLowerCase()) ||
            wh.location.toLowerCase().includes(query.toLowerCase())
        );
        this.view.setState({ filteredWarehouses: filtered });
    }

    getCapacityColor(capacity) {
        if (capacity >= 90) return '#e74c3c'; // 위험 (빨강)
        if (capacity >= 70) return '#f39c12'; // 주의 (주황)
        return '#2ecc71'; // 여유 (초록)
    }

    selectWarehouse(warehouseId) {
        const { warehouses } = this.view.state;
        const selectedWarehouse = warehouses.find(w => w.id === warehouseId);

        if (!selectedWarehouse) {
            this.view.setState({
                viewMode: 'list',
                selectedWarehouse: null,
                error: `창고(${warehouseId})를 찾을 수 없습니다.`
            });
            return;
        }

        this.view.setState({ viewMode: 'detail', selectedWarehouse, error: null });
    }

    goToForm(warehouseId = null) {
        if (!warehouseId) {
            this.view.setState({ viewMode: 'form', selectedWarehouse: null });
            return;
        }
        const { warehouses } = this.view.state;
        const target = warehouses.find(w => w.id === warehouseId);
        this.view.setState({ viewMode: 'form', selectedWarehouse: target });
    }

    saveWarehouse(formData) {
        const { warehouses } = this.view.state;
        const id = formData.id;
        
        const processed = {
            ...formData,
            capacity: Number(formData.capacity ?? 0)
        };

        const existingIdx = warehouses.findIndex(w => w.id === id);
        let newList = [...warehouses];

        if (existingIdx > -1) {
            newList[existingIdx] = processed;
        } else {
            if (warehouses.some(w => w.id === id)) {
                alert('이미 존재하는 창고 코드입니다.');
                return;
            }
            newList.push(processed);
        }

        this.view.setState({
            warehouses: newList,
            filteredWarehouses: newList,
            viewMode: 'list',
            selectedWarehouse: null
        });
    }

    deleteWarehouse(warehouseId) {
        const { warehouses } = this.view.state;
        const newList = warehouses.filter(w => w.id !== warehouseId);
        this.view.setState({
            warehouses: newList,
            filteredWarehouses: newList,
            viewMode: 'list',
            selectedWarehouse: null
        });
    }

    goToList() {
        this.view.setState({ viewMode: 'list', selectedWarehouse: null, error: null });
    }
}

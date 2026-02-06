export class ItemsViewModel {
    constructor(view) {
        this.view = view;
    }

    // 품목 데이터 로드
    async loadItems() {
        this.view.setState({ loading: true, error: null });

        // 나중에 예: const items = await this.view.fetchAPI('/api/items');
        const mockItems = [
            { id: 'ITM-001', name: '샘플 상품 A', category: '전자', stock: 150, unit: 'EA', price: 45000, warehouse: '서울 1번 창고' },
            { id: 'ITM-002', name: '샘플 컨트롤러 v2', category: '부품', stock: 8, unit: 'SET', price: 120000, warehouse: '서울 2번 창고' },
            { id: 'ITM-003', name: 'GPIO 확장 보드', category: '전자', stock: 45, unit: 'EA', price: 15000, warehouse: '인천 창고' },
            { id: 'ITM-004', name: '샘플 어댑터', category: '전자', stock: 2, unit: 'EA', price: 32000, warehouse: '서울 1번 창고' }
        ];

        try {
            this.view.setState({ 
                items: mockItems,
                filteredItems: mockItems,
                loading: false,
                error: null
            });
        } catch (e) {
            this.view.setState({ loading: false, error: e?.message ?? String(e) });
        }
    }

    // 검색 및 필터링
    filterItems(keyword) {
        const { items } = this.view.state;
        const list = Array.isArray(items) ? items : [];

        const q = (keyword ?? '').trim().toLowerCase();
        if (!q) {
            this.view.setState({ filteredItems: list });
            return;
        }

        const filtered = list.filter(item => {
            const name = String(item?.name ?? '').toLowerCase();
            const id = String(item?.id ?? '').toLowerCase();
            const category = String(item?.category ?? '').toLowerCase();
            return name.includes(q) || id.includes(q) || category.includes(q);
        });
        this.view.setState({ filteredItems: filtered });
    }

    // 재고 수량에 따른 상태 텍스트/색상
    getStockStatus(stock) {
        if (stock <= 5) return { text: '부족', color: '#e74c3c' };
        if (stock <= 20) return { text: '주의', color: '#f39c12' };
        return { text: '정상', color: '#2ecc71' };
    }

    // 특정 품목 선택 및 상세 데이터 로드
    async selectItem(itemId) {
        // 나중에 API 호출: await this.view.fetchAPI(`/api/items/${itemId}`);
        const { items } = this.view.state;
        const list = Array.isArray(items) ? items : [];
        const selectedItem = list.find(item => item.id === itemId);

        if (!selectedItem) {
            this.view.setState({
                viewMode: 'list',
                selectedItem: null,
                error: `선택한 품목(${String(itemId)})을(를) 찾을 수 없습니다.`
            });
            return;
        }
        
        // 예시: 최근 입/출고 이력 (실제: 서버 API 연동)
        const history = [
            { date: '2026-01-20', type: '입고', qty: '+50', worker: '홍길동' },
            { date: '2026-01-15', type: '출고', qty: '-10', worker: '이순신' },
            { date: '2026-01-10', type: '입고', qty: '+20', worker: '홍길동' }
        ];

        this.view.setState({ 
            viewMode: 'detail', 
            selectedItem: { ...selectedItem, history },
            error: null
        });
    }

    // 상세 페이지에서 목록으로 돌아가기 또는 폼에서 취소
    goToList() {
        this.view.setState({ viewMode: 'list', selectedItem: null, error: null });
    }

    // 등록/수정 폼으로 이동
    goToForm(itemId = null) {
        if (!itemId) {
            this.view.setState({ viewMode: 'form', selectedItem: null });
            return;
        }
        const { items } = this.view.state;
        const target = items.find(it => it.id === itemId);
        this.view.setState({ viewMode: 'form', selectedItem: target });
    }

    // 품목 저장 (등록 및 수정)
    saveItem(formData) {
        const { items } = this.view.state;
        const id = formData.id;
        
        const processed = {
            ...formData,
            stock: Number(formData.stock || 0),
            price: Number(formData.price || 0)
        };

        const existingIdx = items.findIndex(it => it.id === id);
        let newList = [...items];

        if (existingIdx > -1) {
            newList[existingIdx] = processed;
        } else {
            if (items.some(it => it.id === id)) {
                alert('이미 존재하는 품목 코드입니다.');
                return;
            }
            newList.push(processed);
        }

        this.view.setState({
            items: newList,
            filteredItems: newList,
            viewMode: 'list',
            selectedItem: null
        });
    }

    // 품목 삭제
    deleteItem(itemId) {
        const { items } = this.view.state;
        const newList = items.filter(it => it.id !== itemId);
        this.view.setState({
            items: newList,
            filteredItems: newList,
            viewMode: 'list',
            selectedItem: null
        });
    }
}

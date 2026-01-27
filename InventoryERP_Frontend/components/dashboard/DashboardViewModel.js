export class DashboardViewModel {
    constructor(view) {
        this.view = view;
    }

    // 초기 데이터를 로드하는 함수 (Poco 엔드포인트 연동 전 임시)
    async loadDashboardData() {
        // 나중에는 fetch API로 호출하겠지만, 우선 목업 데이터를 사용합니다.
        const mockData = {
            totalItems: 1250,
            lowStock: 12,
            pendingOrders: 5,
            recentTransactions: [
                { id: 1, type: '입고', item: '샘플 상품 A', qty: 50, date: '2026-01-22' },
                { id: 2, type: '출고', item: '샘플 상품 B', qty: 10, date: '2026-01-21' }
            ]
        };

        // View의 상태를 업데이트 (자동 렌더링 발생)
        this.view.setState({ data: mockData, loading: false });
    }
}

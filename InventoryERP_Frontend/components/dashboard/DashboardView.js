import { BaseComponent } from 'base';
import { DashboardViewModel } from './DashboardViewModel.js';

export class DashboardView extends BaseComponent {
    constructor() {
        super();
        this.vm = new DashboardViewModel(this);
        // 초기 상태
        this.state = { 
            data: { totalItems: 0, lowStock: 0, pendingOrders: 0, recentTransactions: [] },
            loading: true 
        };
    }

    connectedCallback() {
        this.vm.loadDashboardData();
    }

    render() {
        const { data, loading } = this.state;

        this.innerHTML = `
            <style>
                .dashboard-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin-bottom: 30px;
                }
                .stat-card {
                    background: white;
                    padding: 25px;
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }
                .stat-icon {
                    width: 50px;
                    height: 50px;
                    border-radius: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.5rem;
                    color: white;
                }
                .bg-blue { background: #3498db; }
                .bg-red { background: #e74c3c; }
                .bg-green { background: #2ecc71; }
                
                .stat-info h3 { font-size: 0.9rem; color: #7f8c8d; margin-bottom: 5px; }
                .stat-info p { font-size: 1.5rem; font-weight: bold; }

                .recent-table {
                    background: white;
                    padding: 20px;
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                }
                table { width: 100%; border-collapse: collapse; margin-top: 15px; }
                th, td { text-align: left; padding: 12px; border-bottom: 1px solid #eee; }
                th { color: #7f8c8d; font-weight: 500; }
                .badge {
                    display: inline-block;
                    padding: 2px 8px;
                    border-radius: 10px;
                    font-size: 0.8rem;
                    background: #ecf0f1;
                    color: #2c3e50;
                }
            </style>

            <div class="dashboard-container">
                <div class="dashboard-grid">
                    <div class="stat-card">
                        <div class="stat-icon bg-blue"><i class="fas fa-boxes"></i></div>
                        <div class="stat-info"><h3>전체 품목</h3><p>${data.totalItems}</p></div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon bg-red"><i class="fas fa-exclamation-triangle"></i></div>
                        <div class="stat-info"><h3>재고 부족</h3><p>${data.lowStock}</p></div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon bg-green"><i class="fas fa-truck-loading"></i></div>
                        <div class="stat-info"><h3>진행 중인 주문</h3><p>${data.pendingOrders}</p></div>
                    </div>
                </div>

                <div class="recent-table">
                    <h3>최근 입/출고 내역</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>유형</th><th>품목</th><th>수량</th><th>날짜</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${data.recentTransactions.map(t => `
                                <tr>
                                    <td><span class="badge">${t.type}</span></td>
                                    <td>${t.item}</td>
                                    <td>${t.qty}</td>
                                    <td>${t.date}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
}
customElements.define('inventory-dashboard', DashboardView);

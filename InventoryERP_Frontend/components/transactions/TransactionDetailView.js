// components/transactions/TransactionDetailView.js
export const TransactionDetailTemplate = (tx) => {
    if (!tx) {
        return `
            <style>
                .detail-card { background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
                .detail-header { display: flex; align-items: center; gap: 20px; margin-bottom: 25px; border-bottom: 2px solid #f4f7f6; padding-bottom: 15px; }
                .btn-back { background: #34495e; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
            </style>
            <div class="detail-card">
                <div class="detail-header">
                    <button class="btn-back" data-action="back">목록보기</button>
                    <h2>입/출고 상세</h2>
                </div>
                <div style="padding: 8px 0; color: #7f8c8d;">표시할 입/출고 내역이 없습니다.</div>
            </div>
        `;
    }

    const type = String(tx?.type ?? '');

    return `
        <style>
            .detail-card { background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
            .detail-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 25px; border-bottom: 2px solid #f4f7f6; padding-bottom: 15px; }
            .btn-back { background: #34495e; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
            .action-buttons { display: flex; gap: 10px; }
            .btn-edit { background: #f1c40f; color: #2c3e50; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: bold; }
            .btn-delete { background: #e74c3c; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; font-weight: bold; }
            .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 25px; }
            .info-item { border-left: 4px solid #3498db; padding-left: 15px; }
            .label { color: #7f8c8d; font-size: 0.85rem; display: block; }
            .value { font-size: 1.1rem; font-weight: bold; margin-top: 5px; }
        </style>
        <div class="detail-card">
            <div class="detail-header">
                <div style="display: flex; align-items: center; gap: 20px;">
                    <button class="btn-back" data-action="back">목록보기</button>
                    <h2 style="margin: 0;">입/출고 상세</h2>
                </div>
                <div class="action-buttons">
                    <button class="btn-edit" data-action="edit" data-id="${tx.id}">기록 수정</button>
                    <button class="btn-delete" data-action="delete" data-id="${tx.id}">기록 삭제</button>
                </div>
            </div>
            <div class="info-grid">
                <div class="info-item"><span class="label">입/출고ID</span><div class="value">${String(tx?.id ?? '')}</div></div>
                <div class="info-item"><span class="label">유형</span><div class="value">${type}</div></div>
                <div class="info-item"><span class="label">날짜</span><div class="value">${String(tx?.date ?? '')}</div></div>
                <div class="info-item"><span class="label">품목</span><div class="value">${String(tx?.itemName ?? '')} (${String(tx?.itemId ?? '')})</div></div>
                <div class="info-item"><span class="label">수량</span><div class="value">${Number(tx?.qty ?? 0).toLocaleString()}</div></div>
                <div class="info-item"><span class="label">창고</span><div class="value">${String(tx?.warehouse ?? '')}</div></div>
                <div class="info-item"><span class="label">작업자</span><div class="value">${String(tx?.worker ?? '')}</div></div>
                <div class="info-item"><span class="label">메모</span><div class="value">${String(tx?.memo ?? '')}</div></div>
            </div>
        </div>
    `;
};


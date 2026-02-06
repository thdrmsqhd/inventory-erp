// components/warehouse/WarehouseDetailView.js
export const WarehouseDetailTemplate = (wh) => {
    if (!wh) {
        return `
            <style>
                .detail-card { background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
                .detail-header { display: flex; align-items: center; gap: 20px; margin-bottom: 25px; border-bottom: 2px solid #f4f7f6; padding-bottom: 15px; }
                .btn-back { background: #34495e; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
            </style>
            <div class="detail-card">
                <div class="detail-header">
                    <button class="btn-back" data-action="back">목록보기</button>
                    <h2>창고 상세</h2>
                </div>
                <div style="padding: 8px 0; color: #7f8c8d;">표시할 창고 정보가 없습니다.</div>
            </div>
        `;
    }

    return `
        <style>
            .detail-card { background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
            .detail-header { display: flex; align-items: center; gap: 20px; margin-bottom: 25px; border-bottom: 2px solid #f4f7f6; padding-bottom: 15px; }
            .btn-back { background: #34495e; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
            .info-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 25px; }
            .info-item { border-left: 4px solid #3498db; padding-left: 15px; }
            .label { color: #7f8c8d; font-size: 0.85rem; display: block; }
            .value { font-size: 1.1rem; font-weight: bold; margin-top: 5px; }
            .btn-edit { background: #3498db; color: white; border: none; padding: 10px 15px; border-radius: 6px; cursor: pointer; }
            .btn-delete { background: #e74c3c; color: white; border: none; padding: 10px 15px; border-radius: 6px; cursor: pointer; }
        </style>
        <div class="detail-card">
            <div class="detail-header" style="justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 20px;">
                    <button class="btn-back" data-action="back">목록보기</button>
                    <h2 style="margin: 0;">창고 상세</h2>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button class="btn-edit" data-action="edit" data-id="${wh?.id || ''}">
                        <i class="fas fa-edit"></i> 수정
                    </button>
                    <button class="btn-delete" data-action="delete" data-id="${wh?.id || ''}">
                        <i class="fas fa-trash"></i> 삭제
                    </button>
                </div>
            </div>
            <div class="info-grid">
                <div class="info-item"><span class="label">창고명</span><div class="value">${wh?.name || ''}</div></div>
                <div class="info-item"><span class="label">창고 코드</span><div class="value">${wh?.id || ''}</div></div>
                <div class="info-item"><span class="label">위치</span><div class="value">${wh?.location || ''}</div></div>
                <div class="info-item"><span class="label">유형</span><div class="value">${wh?.type || ''}</div></div>
                <div class="info-item"><span class="label">가동률</span><div class="value">${wh?.capacity || 0}%</div></div>
            </div>
        </div>
    `;
};


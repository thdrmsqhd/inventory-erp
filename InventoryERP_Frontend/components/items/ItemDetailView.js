// components/items/ItemDetailView.js
export const ItemDetailTemplate = (item) => {
    if (!item) {
        return `
            <style>
                .detail-card { background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
                .detail-header { display: flex; align-items: center; gap: 20px; margin-bottom: 25px; border-bottom: 2px solid #f4f7f6; padding-bottom: 15px; }
                .btn-back { background: #34495e; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
            </style>
            <div class="detail-card">
                <div class="detail-header">
                    <button class="btn-back" data-action="back">
                        <i class="fas fa-arrow-left"></i> 목록보기
                    </button>
                    <h2>품목 상세 정보</h2>
                </div>
                <div style="padding: 8px 0; color: #7f8c8d;">표시할 품목이 없습니다.</div>
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
            .value { font-size: 1.2rem; font-weight: bold; margin-top: 5px; }
        </style>
        <div class="detail-card">
            <div class="detail-header" style="justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 20px;">
                    <button class="btn-back" data-action="back">
                        <i class="fas fa-arrow-left"></i> 목록보기
                    </button>
                    <h2 style="margin: 0;">품목 상세 정보</h2>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button class="btn-edit" data-action="edit" data-id="${String(item?.id ?? '')}" style="background: #3498db; color: white; border: none; padding: 10px 15px; border-radius: 6px; cursor: pointer; font-weight: bold;">
                        <i class="fas fa-edit"></i> 수정
                    </button>
                    <button class="btn-delete" data-action="delete" data-id="${String(item?.id ?? '')}" style="background: #e74c3c; color: white; border: none; padding: 10px 15px; border-radius: 6px; cursor: pointer; font-weight: bold;">
                        <i class="fas fa-trash"></i> 삭제
                    </button>
                </div>
            </div>
            <div class="info-grid">
                <div class="info-item"><span class="label">품목명</span><div class="value">${String(item?.name ?? '')}</div></div>
                <div class="info-item"><span class="label">품목코드</span><div class="value">${String(item?.id ?? '')}</div></div>
                <div class="info-item"><span class="label">현재고</span><div class="value">${Number(item?.stock ?? 0)} ${String(item?.unit ?? '')}</div></div>
                <div class="info-item"><span class="label">표준단가</span><div class="value">₩${Number(item?.price ?? 0).toLocaleString()}</div></div>
                <div class="info-item"><span class="label">보관창고</span><div class="value">${String(item?.warehouse ?? '')}</div></div>
                <div class="info-item"><span class="label">카테고리</span><div class="value">${String(item?.category ?? '')}</div></div>
            </div>
        </div>
    `;
};

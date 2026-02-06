// components/warehouse/WarehouseFormView.js
export const WarehouseFormTemplate = (wh = null) => {
    const isEdit = !!wh;
    const title = isEdit ? '창고 정보 수정' : '신규 창고 등록';

    return `
        <style>
            .form-card { background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); max-width: 600px; margin: 0 auto; }
            .form-header { display: flex; align-items: center; gap: 20px; margin-bottom: 25px; border-bottom: 2px solid #f4f7f6; padding-bottom: 15px; }
            .btn-back { background: #34495e; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
            .form-group { margin-bottom: 20px; }
            .form-group label { display: block; margin-bottom: 8px; font-weight: bold; color: #2c3e50; font-size: 0.9rem; }
            .form-group input, .form-group select { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 6px; box-sizing: border-box; }
            .form-actions { display: flex; gap: 10px; margin-top: 30px; }
            .btn-save { flex: 1; background: #3498db; color: white; border: none; padding: 15px; border-radius: 6px; cursor: pointer; font-weight: bold; }
            .btn-cancel { background: #ecf0f1; color: #2c3e50; border: none; padding: 15px 25px; border-radius: 6px; cursor: pointer; }
        </style>
        <div class="form-card">
            <div class="form-header">
                <button class="btn-back" data-action="back">
                    <i class="fas fa-arrow-left"></i> 목록보기
                </button>
                <h2>${title}</h2>
            </div>
            <form id="warehouse-form">
                <div class="form-group">
                    <label>창고 코드 ${isEdit ? '(수정 불가)' : ''}</label>
                    <input type="text" name="id" value="${wh?.id ?? ''}" placeholder="예: WH-001" ${isEdit ? 'readonly style="background:#f9f9f9"' : 'required'}>
                </div>
                <div class="form-group">
                    <label>창고명</label>
                    <input type="text" name="name" value="${wh?.name ?? ''}" placeholder="창고 이름을 입력하세요" required>
                </div>
                <div class="form-group">
                    <label>위치</label>
                    <input type="text" name="location" value="${wh?.location ?? ''}" placeholder="창고 위치(주소)를 입력하세요" required>
                </div>
                <div class="form-group">
                    <label>창고 유형</label>
                    <select name="type">
                        <option value="일반" ${wh?.type === '일반' ? 'selected' : ''}>일반</option>
                        <option value="냉장" ${wh?.type === '냉장' ? 'selected' : ''}>냉장</option>
                        <option value="위험" ${wh?.type === '위험' ? 'selected' : ''}>위험</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>최대 수용 용량 (가동률 기준 %)</label>
                    <input type="number" name="capacity" value="${wh?.capacity ?? 0}" min="0" max="100" required>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-cancel" data-action="back">취소</button>
                    <button type="submit" class="btn-save" data-action="save">저장하기</button>
                </div>
            </form>
        </div>
    `;
};

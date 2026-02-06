// components/items/ItemFormView.js
export const ItemFormTemplate = (item = null) => {
    const isEdit = !!item;
    const title = isEdit ? '품목 정보 수정' : '신규 품목 등록';

    return `
        <style>
            .form-card { background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); max-width: 800px; margin: 0 auto; }
            .form-header { margin-bottom: 25px; border-bottom: 2px solid #f4f7f6; padding-bottom: 15px; display: flex; justify-content: space-between; align-items: center; }
            .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
            .form-group { display: flex; flex-direction: column; gap: 8px; }
            .form-group.full-width { grid-column: span 2; }
            label { font-size: 0.9rem; font-weight: bold; color: #2c3e50; }
            input, select, textarea { padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; }
            input:focus { border-color: #3498db; outline: none; box-shadow: 0 0 0 2px rgba(52,152,219,0.2); }
            .btn-group { margin-top: 30px; display: flex; justify-content: flex-end; gap: 12px; }
            .btn-save { background: #2ecc71; color: white; border: none; padding: 12px 25px; border-radius: 6px; cursor: pointer; font-weight: bold; }
            .btn-cancel { background: #95a5a6; color: white; border: none; padding: 12px 25px; border-radius: 6px; cursor: pointer; font-weight: bold; }
        </style>

        <div class="form-card">
            <div class="form-header">
                <h2 style="margin: 0;">${title}</h2>
            </div>
            <form id="item-form">
                <div class="form-grid">
                    <div class="form-group">
                        <label>품목 코드</label>
                        <input type="text" name="id" value="${item?.id || ''}" placeholder="예: ITM-001" ${isEdit ? 'readonly style="background:#f8f9fa;"' : 'required'}>
                    </div>
                    <div class="form-group">
                        <label>품목명</label>
                        <input type="text" name="name" value="${item?.name || ''}" placeholder="품목명을 입력하세요" required>
                    </div>
                    <div class="form-group">
                        <label>카테고리</label>
                        <select name="category" required>
                            <option value="">선택하세요</option>
                            <option value="전자" ${item?.category === '전자' ? 'selected' : ''}>전자</option>
                            <option value="부품" ${item?.category === '부품' ? 'selected' : ''}>부품</option>
                            <option value="원자재" ${item?.category === '원자재' ? 'selected' : ''}>원자재</option>
                            <option value="기타" ${item?.category === '기타' ? 'selected' : ''}>기타</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>단위</label>
                        <input type="text" name="unit" value="${item?.unit || 'EA'}" placeholder="예: EA, SET, KG" required>
                    </div>
                    <div class="form-group">
                        <label>현재고</label>
                        <input type="number" name="stock" value="${item?.stock || 0}" min="0" required>
                    </div>
                    <div class="form-group">
                        <label>단가 (₩)</label>
                        <input type="number" name="price" value="${item?.price || 0}" min="0" required>
                    </div>
                    <div class="form-group full-width">
                        <label>보관 창고</label>
                        <select name="warehouse" required>
                            <option value="">선택하세요</option>
                            <option value="서울 1번 창고" ${item?.warehouse === '서울 1번 창고' ? 'selected' : ''}>서울 1번 창고</option>
                            <option value="서울 2번 창고" ${item?.warehouse === '서울 2번 창고' ? 'selected' : ''}>서울 2번 창고</option>
                            <option value="인천 창고" ${item?.warehouse === '인천 창고' ? 'selected' : ''}>인천 창고</option>
                            <option value="부산 창고" ${item?.warehouse === '부산 창고' ? 'selected' : ''}>부산 창고</option>
                        </select>
                    </div>
                </div>

                <div class="btn-group">
                    <button type="button" class="btn-cancel" data-action="back">취소</button>
                    <button type="submit" class="btn-save">${isEdit ? '수정 완료' : '등록 하기'}</button>
                </div>
            </form>
        </div>
    `;
};

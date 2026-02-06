// components/transactions/TransactionFormView.js
export const TransactionFormTemplate = (tx = null, items = [], warehouses = [], currentUser = null) => {
    const isEdit = !!tx;
    const title = isEdit ? '입출고 기록 수정' : '신규 입출고 등록';
    const workerName = tx?.worker || currentUser?.name || '';

    return `
        <style>
            .form-card { background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); max-width: 800px; margin: 0 auto; }
            .form-header { margin-bottom: 25px; border-bottom: 2px solid #f4f7f6; padding-bottom: 15px; }
            .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
            .form-group { display: flex; flex-direction: column; gap: 8px; }
            .form-group.full-width { grid-column: span 2; }
            label { font-size: 0.9rem; font-weight: bold; color: #2c3e50; }
            input, select, textarea { padding: 10px; border: 1px solid #ddd; border-radius: 6px; font-size: 1rem; }
            input:focus, select:focus, textarea:focus { border-color: #3498db; outline: none; box-shadow: 0 0 0 2px rgba(52,152,219,0.2); }
            .btn-group { margin-top: 30px; display: flex; justify-content: flex-end; gap: 12px; }
            .btn-save { background: #2ecc71; color: white; border: none; padding: 12px 25px; border-radius: 6px; cursor: pointer; font-weight: bold; }
            .btn-cancel { background: #95a5a6; color: white; border: none; padding: 12px 25px; border-radius: 6px; cursor: pointer; font-weight: bold; }
        </style>

        <div class="form-card">
            <div class="form-header">
                <h2 style="margin: 0;">${title}</h2>
            </div>
            <form id="transaction-form">
                <div class="form-grid">
                    <div class="form-group">
                        <label>거래 코드</label>
                        <input type="text" name="id" value="${tx?.id || ''}" placeholder="예: TRX-001" ${isEdit ? 'readonly style="background:#f8f9fa;"' : 'required'}>
                    </div>
                    <div class="form-group">
                        <label>날짜</label>
                        <input type="date" name="date" value="${tx?.date || new Date().toISOString().split('T')[0]}" required>
                    </div>
                    <div class="form-group">
                        <label>유형</label>
                        <select name="type" required>
                            <option value="입고" ${tx?.type === '입고' ? 'selected' : ''}>입고</option>
                            <option value="출고" ${tx?.type === '출고' ? 'selected' : ''}>출고</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>품목 선택</label>
                        <select name="itemInfo" required>
                            <option value="">품목을 선택하세요</option>
                            ${items.map(item => `
                                <option value="${item.id}|${item.name}" ${tx?.itemId === item.id ? 'selected' : ''}>
                                    [${item.id}] ${item.name}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>수량</label>
                        <input type="number" name="qty" value="${tx?.qty || 0}" min="1" required>
                    </div>
                    <div class="form-group">
                        <label>창고 선택</label>
                        <select name="warehouseInfo" required>
                            <option value="">창고를 선택하세요</option>
                            ${warehouses.map(wh => `
                                <option value="${wh.id}|${wh.name}" ${tx?.warehouseId === wh.id ? 'selected' : ''}>
                                    ${wh.name}
                                </option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="form-group">
                        <label>작업자</label>
                        <input type="text" name="worker" value="${workerName}" placeholder="작업자 이름" required>
                    </div>
                    <div class="form-group full-width">
                        <label>메모</label>
                        <textarea name="memo" rows="3" placeholder="기타 특이사항을 입력하세요">${tx?.memo || ''}</textarea>
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

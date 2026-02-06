// components/users/UserFormView.js
export const UserFormTemplate = (user = null) => {
    const isEdit = !!user;
    const title = isEdit ? '사용자 정보 수정' : '신규 사용자 등록';

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
            .helper-text { font-size: 0.8rem; color: #7f8c8d; }
        </style>

        <div class="form-card">
            <div class="form-header">
                <h2 style="margin: 0;">${title}</h2>
            </div>
            <form id="user-form">
                <div class="form-grid">
                    <div class="form-group">
                        <label>사용자 코드</label>
                        <input type="text" name="id" value="${user?.id || ''}" placeholder="예: USR-001" ${isEdit ? 'readonly style="background:#f8f9fa;"' : 'required'}>
                    </div>
                    <div class="form-group">
                        <label>이름</label>
                        <input type="text" name="name" value="${user?.name || ''}" placeholder="실명을 입력하세요" required>
                    </div>
                    <div class="form-group">
                        <label>부서</label>
                        <input type="text" name="department" value="${user?.department || ''}" placeholder="소속 부서">
                    </div>
                    <div class="form-group">
                        <label>이메일</label>
                        <input type="email" name="email" value="${user?.email || ''}" placeholder="example@domain.com" required>
                    </div>
                    <div class="form-group">
                        <label>연락처</label>
                        <input type="tel" name="phone" value="${user?.phone || ''}" placeholder="010-0000-0000">
                    </div>
                    <div class="form-group">
                        <label>권한 등급</label>
                        <select name="role" required>
                            <option value="Viewer" ${user?.role === 'Viewer' ? 'selected' : ''}>Viewer (조회 전용)</option>
                            <option value="Operator" ${user?.role === 'Operator' ? 'selected' : ''}>Operator (운영자)</option>
                            <option value="Master" ${user?.role === 'Master' ? 'selected' : ''}>Master (최고관리자)</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label>계정 상태</label>
                        <select name="status" required>
                            <option value="활성" ${user?.status === '활성' ? 'selected' : ''}>활성 (Active)</option>
                            <option value="비활성" ${user?.status === '비활성' ? 'selected' : ''}>비활성 (Inactive)</option>
                            <option value="대기" ${user?.status === '대기' ? 'selected' : ''}>승인 대기 (Pending)</option>
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

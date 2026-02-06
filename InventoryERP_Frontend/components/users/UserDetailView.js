// components/users/UserDetailView.js
export const UserDetailTemplate = (user) => {
    if (!user) {
        return `
            <style>
                .detail-card { background: white; border-radius: 12px; padding: 30px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
                .detail-header { display: flex; align-items: center; gap: 20px; margin-bottom: 25px; border-bottom: 2px solid #f4f7f6; padding-bottom: 15px; }
                .btn-back { background: #34495e; color: white; border: none; padding: 10px 20px; border-radius: 6px; cursor: pointer; }
            </style>
            <div class="detail-card">
                <div class="detail-header">
                    <button class="btn-back" data-action="back">목록보기</button>
                    <h2>사용자 상세</h2>
                </div>
                <div style="padding: 8px 0; color: #7f8c8d;">표시할 사용자 정보가 없습니다.</div>
            </div>
        `;
    }

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
                    <h2 style="margin: 0;">사용자 상세 정보</h2>
                </div>
                <div class="action-buttons">
                    <button class="btn-edit" data-action="edit">정보 수정</button>
                    <button class="btn-delete" data-action="delete" data-id="${user.id}">사용자 삭제</button>
                </div>
            </div>
            <div class="info-grid">
                <div class="info-item"><span class="label">이름</span><div class="value">${String(user?.name ?? '')}</div></div>
                <div class="info-item"><span class="label">사용자 코드</span><div class="value">${String(user?.id ?? '')}</div></div>
                <div class="info-item"><span class="label">부서</span><div class="value">${String(user?.department ?? '')}</div></div>
                <div class="info-item"><span class="label">권한</span><div class="value">${String(user?.role ?? '')}</div></div>
                <div class="info-item"><span class="label">이메일</span><div class="value">${String(user?.email ?? '')}</div></div>
                <div class="info-item"><span class="label">연락처</span><div class="value">${String(user?.phone ?? '')}</div></div>
                <div class="info-item"><span class="label">상태</span><div class="value">${String(user?.status ?? '')}</div></div>
            </div>
        </div>
    `;
};


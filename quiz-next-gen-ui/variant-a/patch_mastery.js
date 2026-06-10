const fs = require('fs');

let html = fs.readFileSync('quiz.html', 'utf8');

const targetStr = `<div class="card premium-card" style="margin-bottom: 32px; padding: 24px 20px;">
                <div style="margin-bottom: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f6a8.png" style="width: 18px; height: 18px; object-fit: contain;">
                            <span style="font-size: 14px; font-weight: 700; color: var(--text-primary);">Traffic Law</span>
                        </div>
                        <span style="font-size: 15px; font-weight: 800; color: var(--text-primary);">92%</span>
                    </div>
                    <div style="background: rgba(0,0,0,0.04); height: 8px; border-radius: 4px; overflow: hidden;">
                        <div style="background: var(--accent-blue); width: 92%; height: 100%; border-radius: 4px;"></div>
                    </div>
                </div>
                <div style="margin-bottom: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/26d3-fe0f.png" style="width: 18px; height: 18px; object-fit: contain;">
                            <span style="font-size: 14px; font-weight: 700; color: var(--text-primary);">Criminal Law</span>
                        </div>
                        <span style="font-size: 15px; font-weight: 800; color: var(--text-primary);">85%</span>
                    </div>
                    <div style="background: rgba(0,0,0,0.04); height: 8px; border-radius: 4px; overflow: hidden;">
                        <div style="background: var(--accent-blue); width: 85%; height: 100%; border-radius: 4px;"></div>
                    </div>
                </div>
                <div style="margin-bottom: 24px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f9ba.png" style="width: 18px; height: 18px; object-fit: contain;">
                            <span style="font-size: 14px; font-weight: 700; color: var(--text-primary);">Workplace Safety</span>
                        </div>
                        <span style="font-size: 15px; font-weight: 800; color: var(--text-primary);">78%</span>
                    </div>
                    <div style="background: rgba(0,0,0,0.04); height: 8px; border-radius: 4px; overflow: hidden;">
                        <div style="background: var(--accent-blue); width: 78%; height: 100%; border-radius: 4px;"></div>
                    </div>
                </div>
                <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f50d.png" style="width: 18px; height: 18px; object-fit: contain;">
                            <span style="font-size: 14px; font-weight: 700; color: var(--text-primary);">Evidence Law</span>
                        </div>
                        <span style="font-size: 15px; font-weight: 800; color: var(--text-primary);">65%</span>
                    </div>
                    <div style="background: rgba(0,0,0,0.04); height: 8px; border-radius: 4px; overflow: hidden;">
                        <div style="background: var(--accent-blue); width: 65%; height: 100%; border-radius: 4px;"></div>
                    </div>
                </div>
            </div>`;

const replacementStr = `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 32px;">
                <!-- Card 1 -->
                <div class="card premium-card" style="padding: 16px; margin: 0; display: flex; flex-direction: column;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                        <div style="width: 36px; height: 36px; border-radius: 10px; background: rgba(70, 107, 169, 0.1); display: flex; align-items: center; justify-content: center;">
                            <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f6a8.png" style="width: 20px; height: 20px; object-fit: contain;">
                        </div>
                        <span style="font-size: 15px; font-weight: 800; color: var(--text-primary);">92%</span>
                    </div>
                    <span style="font-size: 13px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">Traffic Law</span>
                    <div style="background: rgba(0,0,0,0.04); height: 6px; border-radius: 3px; overflow: hidden; width: 100%;">
                        <div style="background: var(--accent-blue); width: 92%; height: 100%; border-radius: 3px; transition: width 1s ease;"></div>
                    </div>
                </div>
                
                <!-- Card 2 -->
                <div class="card premium-card" style="padding: 16px; margin: 0; display: flex; flex-direction: column;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                        <div style="width: 36px; height: 36px; border-radius: 10px; background: rgba(52, 199, 89, 0.1); display: flex; align-items: center; justify-content: center;">
                            <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/26d3-fe0f.png" style="width: 20px; height: 20px; object-fit: contain;">
                        </div>
                        <span style="font-size: 15px; font-weight: 800; color: var(--text-primary);">85%</span>
                    </div>
                    <span style="font-size: 13px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">Criminal Law</span>
                    <div style="background: rgba(0,0,0,0.04); height: 6px; border-radius: 3px; overflow: hidden; width: 100%;">
                        <div style="background: var(--success); width: 85%; height: 100%; border-radius: 3px; transition: width 1s ease;"></div>
                    </div>
                </div>

                <!-- Card 3 -->
                <div class="card premium-card" style="padding: 16px; margin: 0; display: flex; flex-direction: column;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                        <div style="width: 36px; height: 36px; border-radius: 10px; background: rgba(245, 158, 11, 0.1); display: flex; align-items: center; justify-content: center;">
                            <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f9ba.png" style="width: 20px; height: 20px; object-fit: contain;">
                        </div>
                        <span style="font-size: 15px; font-weight: 800; color: var(--text-primary);">78%</span>
                    </div>
                    <span style="font-size: 13px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">Work Safety</span>
                    <div style="background: rgba(0,0,0,0.04); height: 6px; border-radius: 3px; overflow: hidden; width: 100%;">
                        <div style="background: #f59e0b; width: 78%; height: 100%; border-radius: 3px; transition: width 1s ease;"></div>
                    </div>
                </div>

                <!-- Card 4 -->
                <div class="card premium-card" style="padding: 16px; margin: 0; display: flex; flex-direction: column;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                        <div style="width: 36px; height: 36px; border-radius: 10px; background: rgba(148, 163, 184, 0.1); display: flex; align-items: center; justify-content: center;">
                            <img src="https://unpkg.com/emoji-datasource-apple@15.0.1/img/apple/64/1f50d.png" style="width: 20px; height: 20px; object-fit: contain;">
                        </div>
                        <span style="font-size: 15px; font-weight: 800; color: var(--text-primary);">65%</span>
                    </div>
                    <span style="font-size: 13px; font-weight: 700; color: var(--text-primary); margin-bottom: 8px;">Evidence</span>
                    <div style="background: rgba(0,0,0,0.04); height: 6px; border-radius: 3px; overflow: hidden; width: 100%;">
                        <div style="background: var(--text-dim); width: 65%; height: 100%; border-radius: 3px; transition: width 1s ease;"></div>
                    </div>
                </div>
            </div>`;

html = html.replace(targetStr, replacementStr);

fs.writeFileSync('quiz.html', html, 'utf8');
console.log("Mastery progress redesigned successfully.");

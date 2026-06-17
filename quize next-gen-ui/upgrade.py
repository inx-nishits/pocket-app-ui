import re

css = """
        :root {
            --bg-color: #EBF0F5;
            --card-bg: #FFFFFF;
            --text-primary: #0B132B;
            --text-secondary: #4A5568;
            --text-dim: #A0AEC0;
            --accent-main: #FF4757; /* Energetic Coral Red */
            --accent-dark: #2F3542;
            --shadow-float: 0 20px 40px rgba(11, 19, 43, 0.08);
            --shadow-pressed: 0 5px 15px rgba(11, 19, 43, 0.05);
            --safe-area-top: env(safe-area-inset-top, 24px);
            --safe-area-bottom: env(safe-area-inset-bottom, 24px);
        }

        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
            -webkit-tap-highlight-color: transparent;
        }

        body {
            font-family: 'Inter', -apple-system, sans-serif;
            background-color: var(--bg-color);
            display: flex;
            justify-content: center;
            align-items: flex-start;
            min-height: 100vh;
            min-height: -webkit-fill-available;
            color: var(--text-primary);
            overflow: hidden;
            overscroll-behavior-y: none;
        }

        html {
            height: -webkit-fill-available;
            -webkit-text-size-adjust: 100%;
        }

        .app-container {
            width: 100%;
            height: 100vh;
            height: 100dvh;
            background-color: var(--bg-color);
            position: relative;
            overflow: hidden;
            display: flex;
            flex-direction: column;
        }

        .app-header {
            display: contents;
        }

        .top-nav-group {
            background: transparent;
            padding-top: var(--safe-area-top);
            position: relative;
            z-index: 10;
        }

        .top-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 24px 24px 8px;
        }

        .ai-spatial-pill {
            background: var(--text-primary);
            padding: 0 20px 0 8px;
            border-radius: 100px;
            display: flex;
            align-items: center;
            gap: 12px;
            box-shadow: var(--shadow-float);
            height: 52px;
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .ai-spatial-pill:active { transform: scale(0.92); }

        .ai-pulse-wrap {
            width: 36px;
            height: 36px;
            background: var(--accent-main);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 0 15px rgba(255, 71, 87, 0.4);
        }

        .ai-pulse-wrap img {
            width: 20px;
            height: 20px;
            filter: brightness(0) invert(1);
        }

        .ai-hint {
            color: #FFFFFF;
            font-weight: 700;
            font-size: 14px;
            letter-spacing: 0.5px;
        }

        .top-actions {
            display: flex;
            align-items: center;
            background: #FFFFFF;
            border-radius: 100px;
            padding: 0 16px;
            gap: 18px;
            height: 52px;
            box-shadow: var(--shadow-float);
        }

        .top-actions img {
            width: 20px;
            height: 20px;
            opacity: 0.7;
            transition: all 0.2s;
            cursor: pointer;
        }
        
        .top-actions img:active {
            opacity: 1;
            transform: scale(0.8);
        }

        .search-section {
            padding: 12px 24px;
            display: flex;
            gap: 16px;
            align-items: center;
        }

        .search-input-wrapper {
            flex: 1;
            min-width: 0;
            background: #FFFFFF;
            border-radius: 100px;
            display: flex;
            align-items: center;
            padding: 0 20px;
            height: 64px;
            box-shadow: var(--shadow-float);
            transition: transform 0.3s ease;
        }

        .search-input-wrapper:focus-within {
            transform: translateY(-2px);
            box-shadow: 0 30px 60px rgba(11, 19, 43, 0.12);
        }

        .search-input-wrapper input {
            flex: 1;
            border: none;
            background: transparent;
            font-size: 16px;
            font-weight: 600;
            outline: none;
            color: var(--text-primary);
            min-width: 0;
            height: 100%;
        }

        .search-input-wrapper input::placeholder {
            color: var(--text-dim);
            font-weight: 500;
        }

        .search-input-wrapper > img {
            width: 24px;
            height: 24px;
            filter: invert(0) opacity(0.5);
            margin-right: 16px;
            flex-shrink: 0;
        }

        .search-all-cta { display: none; }

        .filter-btn {
            background: var(--text-primary);
            width: 64px;
            height: 64px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: var(--shadow-float);
            cursor: pointer;
            flex-shrink: 0;
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            border: none;
        }
        
        .filter-btn:active { transform: scale(0.85); background: var(--accent-main); }

        .filter-btn img {
            width: 24px;
            height: 24px;
            filter: brightness(0) invert(1);
        }

        .sticky-tabs-container {
            position: sticky;
            top: -1px;
            padding: calc(var(--safe-area-top) + 12px) 0 20px 0;
            background: linear-gradient(180deg, var(--bg-color) 40%, rgba(235,240,245,0) 100%);
            z-index: 100;
            pointer-events: none; /* Let scroll pass through background */
        }
        
        .magic-tabs-wrapper {
            margin: 0 24px;
            background: #FFFFFF;
            border-radius: 100px;
            padding: 6px;
            position: relative;
            display: flex;
            box-shadow: var(--shadow-float);
            pointer-events: auto; /* Re-enable clicks for tabs */
        }

        .tab-indicator {
            position: absolute;
            top: 6px;
            bottom: 6px;
            left: 6px;
            width: calc(25% - 3px);
            background: var(--text-primary);
            border-radius: 100px;
            box-shadow: 0 4px 12px rgba(11, 19, 43, 0.2);
            transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
            z-index: 1;
        }

        .m-tab {
            flex: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 4px;
            padding: 14px 0;
            cursor: pointer;
            z-index: 2;
            color: var(--text-dim);
            transition: all 0.3s;
        }

        .m-tab span {
            font-size: 11px;
            font-weight: 800;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            white-space: nowrap;
        }

        .m-tab img {
            width: 24px;
            height: 24px;
            opacity: 0.6;
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .m-tab.m-tab-active {
            color: #FFFFFF;
        }

        .m-tab.m-tab-active img {
            filter: brightness(0) invert(1);
            opacity: 1;
            transform: scale(1.1) translateY(-2px);
        }

        .scroller {
            flex: 1;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 160px;
            scrollbar-width: none;
            -ms-overflow-style: none;
        }

        .scroller::-webkit-scrollbar { display: none; }

        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 24px 20px;
            position: sticky;
            top: calc(var(--safe-area-top) + 110px);
            z-index: 50;
            pointer-events: none;
        }
        
        /* Disable the scrolled line in this floating layout */
        .scrolled .section-header { border-bottom: none; }

        .section-header h2 {
            font-size: 42px;
            font-weight: 900;
            letter-spacing: -1.5px;
            color: var(--text-primary);
            text-shadow: 0 10px 20px rgba(11,19,43,0.1);
        }

        .view-toggles {
            display: flex;
            background: #FFFFFF;
            border-radius: 100px;
            padding: 6px;
            box-shadow: var(--shadow-float);
            pointer-events: auto;
        }

        .view-btn {
            background: transparent;
            border: none;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            color: var(--text-dim);
            transition: all 0.3s;
        }

        .view-btn.active {
            background: var(--bg-color);
            color: var(--text-primary);
        }

        .view-btn svg {
            width: 20px;
            height: 20px;
            stroke: currentColor;
            stroke-width: 2.5;
        }

        .cards-container {
            padding: 0 24px;
            transition: all 0.3s ease;
        }

        .cards-container.grid-view {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
        }

        .cards-container.list-view {
            display: flex;
            flex-direction: column;
            gap: 24px;
        }

        .card {
            background: var(--card-bg);
            border-radius: 32px;
            padding: 28px;
            box-shadow: 0 10px 30px rgba(11, 19, 43, 0.04);
            border: none;
            display: flex;
            flex-direction: column;
            transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease;
            position: relative;
            overflow: hidden;
        }

        .card:active {
            transform: scale(0.94) translateY(4px);
            box-shadow: var(--shadow-pressed);
        }

        .card-content { flex: 1; }

        .card-title {
            font-size: 20px;
            font-weight: 800;
            line-height: 1.3;
            letter-spacing: -0.5px;
            margin-bottom: 12px;
            color: var(--text-primary);
        }

        .card-subtitle {
            font-size: 15px;
            color: var(--text-secondary);
            font-weight: 500;
            line-height: 1.5;
            margin-bottom: 32px;
        }

        .card-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: auto;
        }

        .card-date {
            font-size: 11px;
            color: var(--text-dim);
            text-transform: uppercase;
            letter-spacing: 1px;
            font-weight: 700;
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        .card-date span {
            color: var(--text-primary);
            font-weight: 900;
            font-size: 15px;
            letter-spacing: -0.2px;
        }

        .card-icons {
            display: flex;
            gap: 12px;
        }

        .star-btn,
        .pin-btn {
            background: var(--bg-color);
            border: none;
            width: 52px;
            height: 52px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .star-btn:active, .pin-btn:active {
            transform: scale(0.8);
        }

        .pin-btn {
            background: rgba(47, 53, 66, 0.05); /* very soft grey/blue */
        }

        .star-btn.active {
            background: var(--accent-main);
            box-shadow: 0 8px 20px rgba(255, 71, 87, 0.3);
        }

        .star-btn img,
        .pin-btn img {
            width: 22px;
            height: 22px;
            filter: invert(0) opacity(0.5);
            transition: all 0.3s;
        }

        .pin-btn img { opacity: 0.8; }

        .star-btn.active img {
            filter: brightness(0) invert(1);
            opacity: 1;
            transform: scale(1.1);
        }

        /* ----- Bottom Nav ----- */
        .bottom-nav-wrapper {
            position: absolute;
            bottom: max(32px, var(--safe-area-bottom));
            left: 0;
            width: 100%;
            padding: 0 32px;
            z-index: 200;
            transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.6s;
        }

        .nav-hidden .bottom-nav-wrapper {
            transform: translateY(180px);
            opacity: 0;
            pointer-events: none;
        }

        .bottom-nav {
            background: #FFFFFF;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px;
            border-radius: 100px;
            box-shadow: 0 24px 48px rgba(11, 19, 43, 0.15);
        }

        .nav-btn {
            background: transparent;
            border: none;
            height: 60px;
            width: 60px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            position: relative;
        }

        .nav-btn:active { transform: scale(0.8); }

        .nav-btn.active {
            background: var(--text-primary);
            width: 60px;
            box-shadow: inset 0 -4px 0 rgba(0,0,0,0.2);
        }

        .nav-btn img {
            width: 26px;
            height: 26px;
            filter: invert(0) opacity(0.3);
            transition: all 0.4s;
        }

        .nav-btn.active img {
            filter: brightness(0) invert(1);
            opacity: 1;
            transform: translateY(-2px);
        }

        /* ----- Responsive / Desktop Mockup bounds ----- */
        @media (min-width: 500px) {
            body {
                padding: 40px 0;
                background-color: #D1D8E0;
                overflow: auto;
            }

            .app-container {
                max-width: 430px;
                border-radius: 50px;
                height: 932px;
                border: 14px solid #0B132B;
                box-shadow: inset 0 0 0 4px #FFFFFF, 0 40px 100px rgba(0, 0, 0, 0.2);
            }
        }
"""

with open('./index-c.html', 'r', encoding='utf-8') as f:
    html = f.read()

html = re.sub(r'<style>.*?</style>', f'<style>{css}</style>', html, flags=re.DOTALL)

with open('./index-c.html', 'w', encoding='utf-8') as f:
    f.write(html)

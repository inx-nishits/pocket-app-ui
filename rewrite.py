import os

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no">
    <!-- PWA / iOS Native App Meta Tags -->
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="default">
    <meta name="theme-color" content="#ffffff">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <title>Pocket App - New Horizon UI</title>
    <style>
        :root {
            --bg-color: #F8FAFC;
            --surface: #FFFFFF;
            --text-primary: #0F172A;
            --text-secondary: #64748B;
            --text-dim: #94A3B8;
            --accent-blue: #2563EB;
            --accent-light: #EFF6FF;
            --border: #E2E8F0;
            --safe-top: env(safe-area-inset-top, 24px);
            --safe-bottom: env(safe-area-inset-bottom, 24px);
        }

        * { margin: 0; padding: 0; box-sizing: border-box; -webkit-tap-highlight-color: transparent; font-family: 'Plus Jakarta Sans', sans-serif; }

        body {
            background-color: var(--bg-color);
            color: var(--text-primary);
            height: 100vh;
            display: flex;
            justify-content: center;
        }

        .device-wrapper {
            width: 100%;
            height: 100%;
            background: var(--bg-color);
            position: relative;
            display: flex;
            flex-direction: column;
        }

        @media (min-width: 500px) {
            body { background: #E2E8F0; padding: 20px 0; }
            .device-wrapper {
                max-width: 420px; height: 850px;
                border-radius: 40px; border: 12px solid #0F172A;
                box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
            }
        }

        /* --- REDESIGNED HEADER --- */
        .header-section {
            background: var(--surface);
            padding: calc(var(--safe-top) + 20px) 24px 24px;
            border-bottom-left-radius: 32px;
            border-bottom-right-radius: 32px;
            box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05);
            z-index: 10;
            position: relative;
        }

        .top-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
        }

        .greeting h1 {
            font-size: 28px;
            font-weight: 800;
            letter-spacing: -1px;
            color: var(--text-primary);
        }
        .greeting p {
            font-size: 14px;
            color: var(--text-secondary);
            font-weight: 500;
        }

        .profile-actions {
            display: flex;
            gap: 12px;
        }
        .action-circle {
            width: 44px; height: 44px;
            background: var(--bg-color);
            border-radius: 50%;
            display: flex; justify-content: center; align-items: center;
            cursor: pointer;
        }
        .action-circle img { width: 20px; height: 20px; opacity: 0.7; }

        .search-bar {
            background: var(--bg-color);
            border-radius: 16px;
            height: 56px;
            display: flex;
            align-items: center;
            padding: 0 16px;
            border: 1px solid var(--border);
        }
        .search-bar img.s-icon { width: 20px; opacity: 0.5; margin-right: 12px; }
        .search-bar input {
            flex: 1; border: none; background: transparent; font-size: 16px; outline: none;
            font-weight: 500; color: var(--text-primary);
        }
        .search-bar .filter-btn {
            width: 40px; height: 40px; background: var(--surface); border-radius: 12px;
            display: flex; justify-content: center; align-items: center;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
        }
        .search-bar .filter-btn img { width: 18px; opacity: 0.7; }

        .ai-banner {
            margin-top: 20px;
            background: linear-gradient(135deg, var(--accent-blue), #60A5FA);
            border-radius: 20px;
            padding: 16px 20px;
            display: flex;
            align-items: center;
            gap: 16px;
            color: white;
            box-shadow: 0 10px 25px rgba(37, 99, 235, 0.2);
        }
        .ai-banner .icon-box {
            width: 40px; height: 40px; background: rgba(255,255,255,0.2);
            border-radius: 12px; display: flex; justify-content: center; align-items: center;
        }
        .ai-banner .icon-box img { width: 24px; filter: brightness(0) invert(1); }
        .ai-banner .text h3 { font-size: 16px; font-weight: 700; margin-bottom: 2px; }
        .ai-banner .text p { font-size: 13px; opacity: 0.9; }

        /* --- HORIZONTAL CATEGORY SWIPE --- */
        .category-scroll {
            position: relative;
            margin-top: -20px;
            padding: 40px 24px 20px;
            display: flex;
            gap: 12px;
            overflow-x: auto;
            scrollbar-width: none;
            z-index: 5;
        }
        .category-scroll::-webkit-scrollbar { display: none; }
        .cat-card {
            min-width: 110px;
            background: var(--surface);
            padding: 16px;
            border-radius: 20px;
            display: flex; flex-direction: column; align-items: flex-start; gap: 12px;
            box-shadow: 0 4px 12px rgba(15, 23, 42, 0.03);
            border: 1px solid var(--border);
            transition: all 0.2s;
        }
        .cat-card.active {
            background: var(--text-primary);
            color: white; border-color: var(--text-primary);
        }
        .cat-card .icon-wrap {
            width: 36px; height: 36px; background: var(--bg-color); border-radius: 10px;
            display: flex; justify-content: center; align-items: center;
        }
        .cat-card.active .icon-wrap { background: rgba(255,255,255,0.1); }
        .cat-card img { width: 18px; filter: invert(0) brightness(0); opacity: 0.7; }
        .cat-card.active img { filter: brightness(0) invert(1); opacity: 1; }
        .cat-card span { font-size: 14px; font-weight: 600; }
        
        .main-content {
            flex: 1;
            overflow-y: auto;
            padding: 0 24px 120px;
            scrollbar-width: none;
        }
        .main-content::-webkit-scrollbar { display: none; }

        .section-title {
            font-size: 20px;
            font-weight: 800;
            margin-bottom: 16px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .section-title span.count {
            font-size: 13px; font-weight: 600; color: var(--accent-blue);
            background: var(--accent-light); padding: 4px 10px; border-radius: 20px;
        }

        .list-container {
            display: flex;
            flex-direction: column;
            gap: 16px;
            padding-bottom: 40px;
        }

        /* --- REDESIGNED LIST CARDS --- */
        .record-card {
            background: var(--surface);
            border-radius: 24px;
            padding: 20px;
            display: flex;
            flex-direction: column;
            gap: 16px;
            box-shadow: 0 2px 10px rgba(15, 23, 42, 0.04);
            border: 1px solid rgba(15, 23, 42, 0.05);
            /* Stacking Scroll behavior retained as requested */
            position: sticky;
            border-top: 1px solid rgba(255,255,255,0.9);
            box-shadow: 0 -8px 24px rgba(0,0,0,0.06), 0 2px 10px rgba(15, 23, 42, 0.04); 
        }
        
        /* Specific Top stacking offsets */
        .record-card:nth-child(1) { top: 0px; z-index: 1;}
        .record-card:nth-child(2) { top: 12px; z-index: 2;}
        .record-card:nth-child(3) { top: 24px; z-index: 3;}
        .record-card:nth-child(4) { top: 36px; z-index: 4;}
        .record-card:nth-child(5) { top: 48px; z-index: 5;}
        .record-card:nth-child(6) { top: 60px; z-index: 6;}
        

        .rc-header { display: flex; justify-content: space-between; align-items: flex-start; }
        .rc-tag {
            font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;
            background: var(--bg-color); color: var(--text-secondary); padding: 4px 8px; border-radius: 8px;
        }
        .rc-date { font-size: 12px; color: var(--text-dim); font-weight: 600; }

        .rc-body h4 { font-size: 18px; font-weight: 700; margin-bottom: 6px; line-height: 1.3; }
        .rc-body p { font-size: 14px; color: var(--text-secondary); line-height: 1.4; }

        .rc-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid var(--border);
            padding-top: 16px;
        }
        
        .rc-btn-group { display: flex; gap: 8px; }
        .icon-btn {
            width: 40px; height: 40px; border-radius: 12px; border: 1px solid var(--border);
            display: flex; justify-content: center; align-items: center; background: var(--surface);
        }
        .icon-btn img { width: 18px; opacity: 0.6; }
        
        .icon-btn.active { background: var(--accent-light); border-color: var(--accent-blue); }
        .icon-btn.active img { filter: invert(40%) sepia(85%) saturate(3000%) hue-rotate(210deg) brightness(100%) contrast(100%); opacity: 1; }

        /* --- REDESIGNED BOTTOM NAV FLOATING PILL --- */
        .bottom-nav {
            position: absolute;
            bottom: max(20px, var(--safe-bottom));
            left: 24px; right: 24px;
            background: var(--text-primary);
            border-radius: 30px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 12px;
            box-shadow: 0 20px 40px rgba(15, 23, 42, 0.2);
            z-index: 100;
        }
        .nav-item {
            width: 56px; height: 56px; display: flex; justify-content: center; align-items: center;
            border-radius: 20px; transition: all 0.3s;
        }
        .nav-item img { width: 24px; filter: brightness(0) invert(1); opacity: 0.5; }
        .nav-item.active { background: rgba(255,255,255,0.1); }
        .nav-item.active img { opacity: 1; filter: brightness(0) invert(1) drop-shadow(0 0 5px rgba(255,255,255,0.5)); }

    </style>
</head>
<body>

<div class="device-wrapper">

    <!-- REDESIGNED WELCOME HEADER -->
    <div class="header-section">
        <div class="top-row">
            <div class="greeting">
                <p>Welcome back</p>
                <h1>Officer Spatial</h1>
            </div>
            <div class="profile-actions">
                <div class="action-circle"><img src="images/megaphone.svg" alt="Alerts"></div>
                <div class="action-circle"><img src="images/ps-podcast.svg" alt="Podcast"></div>
            </div>
        </div>

        <div class="search-bar">
            <img src="images/search.svg" class="s-icon" alt="Search">
            <input type="text" placeholder="Search the database...">
            <div class="filter-btn"><img src="images/filter.svg" alt="Filter"></div>
        </div>

        <div class="ai-banner">
            <div class="icon-box"><img src="images/ai.svg" alt="AI"></div>
            <div class="text">
                <h3>Spatial AI Assistant</h3>
                <p>Ready to analyze intelligence</p>
            </div>
        </div>
    </div>

    <!-- REDESIGNED CATEGORY SWIPE -->
    <div class="category-scroll">
        <div class="cat-card active">
            <div class="icon-wrap"><img src="images/all.svg" alt="All"></div>
            <span>All Records</span>
        </div>
        <div class="cat-card">
            <div class="icon-wrap"><img src="images/summary.svg" alt="Summary"></div>
            <span>Summary</span>
        </div>
        <div class="cat-card">
            <div class="icon-wrap"><img src="images/either-way.svg" alt="Either"></div>
            <span>Either Way</span>
        </div>
        <div class="cat-card">
            <div class="icon-wrap"><img src="images/Indictable.svg" alt="Indictable"></div>
            <span>Indictable</span>
        </div>
    </div>

    <div class="main-content">
        <div class="section-title">
            Intelligence Reports
            <span class="count">250+</span>
        </div>

        <div class="list-container">
            <!-- Card 1 -->
            <div class="record-card">
                <div class="rc-header">
                    <span class="rc-tag">0-9 INDEX</span>
                    <span class="rc-date">02-05-2025</span>
                </div>
                <div class="rc-body">
                    <h4>3x5x2 Intelligence</h4>
                    <p>Forces Gradually Adopting from April 2016 implementation standards.</p>
                </div>
                <div class="rc-footer">
                    <div class="rc-btn-group">
                        <div class="icon-btn"><img src="images/attech.svg" alt="Pin"></div>
                        <div class="icon-btn active"><img src="images/star-sm.svg" alt="Star"></div>
                    </div>
                </div>
            </div>

            <!-- Card 2 -->
            <div class="record-card">
                <div class="rc-header">
                    <span class="rc-tag">0-9 INDEX</span>
                    <span class="rc-date">02-05-2025</span>
                </div>
                <div class="rc-body">
                    <h4>4 R's - Detained Person</h4>
                    <p>PACE Code C - Annex H Observation List updates and frameworks.</p>
                </div>
                <div class="rc-footer">
                    <div class="rc-btn-group">
                        <div class="icon-btn"><img src="images/attech.svg" alt="Pin"></div>
                        <div class="icon-btn"><img src="images/star-sm.svg" alt="Star"></div>
                    </div>
                </div>
            </div>

            <!-- Card 3 -->
            <div class="record-card">
                <div class="rc-header">
                    <span class="rc-tag">0-9 INDEX</span>
                    <span class="rc-date">02-05-2025</span>
                </div>
                <div class="rc-body">
                    <h4>5 Statutory Principles</h4>
                    <p>Mental Capacity Act 2005 evaluation and implementation criteria.</p>
                </div>
                <div class="rc-footer">
                    <div class="rc-btn-group">
                        <div class="icon-btn"><img src="images/attech.svg" alt="Pin"></div>
                        <div class="icon-btn active"><img src="images/star-sm.svg" alt="Star"></div>
                    </div>
                </div>
            </div>

            <!-- Card 4 -->
            <div class="record-card">
                <div class="rc-header">
                    <span class="rc-tag">0-9 INDEX</span>
                    <span class="rc-date">02-05-2025</span>
                </div>
                <div class="rc-body">
                    <h4>16 Point Ethnic Classification</h4>
                    <p>Officer Defined Ethnicity standard recording index parameters.</p>
                </div>
                <div class="rc-footer">
                    <div class="rc-btn-group">
                        <div class="icon-btn"><img src="images/attech.svg" alt="Pin"></div>
                        <div class="icon-btn"><img src="images/star-sm.svg" alt="Star"></div>
                    </div>
                </div>
            </div>

            <!-- Card 5 -->
             <div class="record-card">
                <div class="rc-header">
                    <span class="rc-tag">DASH REPORT</span>
                    <span class="rc-date">01-14-2025</span>
                </div>
                <div class="rc-body">
                    <h4>DASH Risk Identification</h4>
                    <p>Domestic Abuse Stalking & Harassment evaluation metrics.</p>
                </div>
                <div class="rc-footer">
                    <div class="rc-btn-group">
                        <div class="icon-btn"><img src="images/attech.svg" alt="Pin"></div>
                        <div class="icon-btn active"><img src="images/star-sm.svg" alt="Star"></div>
                    </div>
                </div>
            </div>

            <!-- Card 6 -->
            <div class="record-card">
                <div class="rc-header">
                    <span class="rc-tag">VAF REPORT</span>
                    <span class="rc-date">12-05-2024</span>
                </div>
                <div class="rc-body">
                    <h4>Vulnerability Framework</h4>
                    <p>VAF V1.2 Guidelines and updated parameter reviews.</p>
                </div>
                <div class="rc-footer">
                    <div class="rc-btn-group">
                        <div class="icon-btn"><img src="images/attech.svg" alt="Pin"></div>
                        <div class="icon-btn"><img src="images/star-sm.svg" alt="Star"></div>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <!-- REDESIGNED FLOATING BOTTOM PILL -->
    <div class="bottom-nav">
        <div class="nav-item active"><img src="images/cards.svg" alt="Home"></div>
        <div class="nav-item"><img src="images/folders.svg" alt="Folders"></div>
        <div class="nav-item"><img src="images/smart-folder.svg" alt="Smart"></div>
        <div class="nav-item"><img src="images/settings.svg" alt="Settings"></div>
    </div>
</div>

</body>
</html>
"""

with open('c:/Projects/pocket-app-ui/index-f.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

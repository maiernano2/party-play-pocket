# Google Analytics 4 Integration - Partyspiele.app

## Setup Instructions

### 1. Google Analytics Configuration
1. Create a new GA4 property at [Google Analytics](https://analytics.google.com/)
2. Get your Measurement ID (format: G-XXXXXXXXXX)
3. Replace `GA_MEASUREMENT_ID` in `index.html` with your actual Measurement ID

### 2. Environment Setup
```html
<!-- In index.html, replace GA_MEASUREMENT_ID with your actual ID -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ACTUAL-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YOUR-ACTUAL-ID', {
    page_title: document.title,
    custom_map: {'custom_parameter_1': 'game_type'}
  });
</script>
```

## Tracked Events

### Homepage Events
- **page_view**: Automatic page view tracking
- **scroll_to_games**: When user clicks "Zu den Spielen" button
- **filter_games**: When user selects game filters (alle/einzelspiel/teamspiel)
- **feedback_submit**: When user submits feedback form
- **theme_toggle**: When user switches between light/dark theme

### Game Detail Events
- **game_view**: When user visits a specific game detail page
- **game_start**: When user clicks "Spiel starten" button
- **interactive_mode_enter**: When entering interactive game mode
- **interactive_mode_exit**: When exiting interactive game mode

### Performance Tracking
- **LCP** (Largest Contentful Paint): Page loading performance
- **FID** (First Input Delay): Interactivity measurement
- **CLS** (Cumulative Layout Shift): Visual stability

## Custom Dimensions

### Standard Parameters
- `game_id`: Unique identifier for each game
- `game_type`: "einzelspiel" or "teamspiel"
- `filter_type`: Current filter selection
- `theme`: "light" or "dark"
- `page_title`: Current page title

### Game-Specific Parameters
- `player_count`: Number of players (when applicable)
- `game_duration`: Actual time spent playing
- `round_number`: Current round in game
- `score`: Points achieved in game

## Analytics Dashboard Setup

### Key Metrics to Monitor
1. **Game Popularity**: Which games are viewed/played most
2. **User Engagement**: Time spent on site, pages per session
3. **Conversion Funnel**: View → Start → Complete rates
4. **Performance**: Core Web Vitals scores
5. **User Preferences**: Theme usage, filter preferences

### Recommended Custom Reports
1. **Game Performance Report**
   - Dimensions: Game ID, Game Type
   - Metrics: Game Views, Game Starts, Completion Rate

2. **User Journey Report**
   - Dimensions: Page Title, Event Name
   - Metrics: Sessions, Engagement Rate, Bounce Rate

3. **Performance Report**
   - Dimensions: Page Title, Device Category
   - Metrics: LCP, FID, CLS scores

## Privacy & GDPR Compliance

### Current Implementation
- Anonymized IP tracking enabled
- No personal data collection
- Event-based tracking only

### Cookie Consent (Recommended Addition)
Consider adding a cookie consent banner for GDPR compliance:
```javascript
// Example cookie consent implementation
if (userConsent) {
  // Initialize GA4 tracking
  gtag('config', 'G-YOUR-ID', {
    anonymize_ip: true,
    allow_google_signals: false
  });
}
```

## Development vs Production

### Development Mode
- Events logged to console
- No actual GA4 requests sent
- Full event debugging available

### Production Mode
- Events sent to GA4
- Performance tracking active
- Real-time analytics available

## Event Testing

### Using Google Tag Assistant
1. Install [Google Tag Assistant](https://tagassistant.google.com/)
2. Navigate to your site
3. Check for properly firing events
4. Validate parameter values

### Real-time Reports
1. Open GA4 Real-time reports
2. Perform actions on your site
3. Verify events appear in real-time

## Migration from Universal Analytics

If migrating from UA, note these key differences:
- Events structure changed (no more Category/Action/Label)
- Custom dimensions setup is different
- Enhanced measurement features built-in
- Privacy-focused by default

## Troubleshooting

### Common Issues
1. **Events not firing**: Check console for errors, verify GA ID
2. **Missing parameters**: Ensure all custom parameters are properly passed
3. **Development mode**: Remember to replace GA_MEASUREMENT_ID in production

### Debug Commands
```javascript
// Check if gtag is loaded
console.log(typeof window.gtag);

// Enable debug mode
gtag('config', 'G-YOUR-ID', {
  debug_mode: true
});
```
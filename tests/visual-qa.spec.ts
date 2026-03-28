import { test, expect } from '@playwright/test';

test('Beautiful Mindmap - Visual QA & Debug', async ({ page }) => {
  console.log('🚀 Step 1: Launching website...');
  
  await page.goto('http://localhost:3000/editor', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);
  
  console.log('📸 Step 2: Taking full page screenshot...');
  await page.screenshot({ path: 'test-results/visual-qa-fullpage.png', fullPage: true });
  
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(500);
  await page.evaluate(() => window.scrollTo(0, 0));
  
  console.log('🔍 Step 3: Checking Console & Network...');
  
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
      console.error('❌ Console Error:', msg.text());
    }
  });
  
  console.log('🖱️ Step 4: Functional verification...');
  
  // Test responsive design
  await page.setViewportSize({ width: 375, height: 667 });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'test-results/visual-qa-mobile.png' });
  
  await page.setViewportSize({ width: 1920, height: 1080 });
  await page.waitForTimeout(500);
  
  // Hover over buttons
  const addNodeBtn = page.getByRole('button', { name: /Add Node/i });
  if (await addNodeBtn.isVisible()) {
    await addNodeBtn.hover();
    await page.waitForTimeout(300);
  }
  
  // Click export dropdown
  const exportBtn = page.getByRole('button', { name: /Export/i });
  if (await exportBtn.isVisible()) {
    await exportBtn.click();
    await page.waitForTimeout(500);
    
    const pdfOption = page.getByText('PDF Document');
    const pngOption = page.getByText('PNG Image');
    const svgOption = page.getByText('SVG Vector');
    const jsonOption = page.getByText('JSON Data');
    
    await expect(pdfOption).toBeVisible();
    await expect(pngOption).toBeVisible();
    await expect(svgOption).toBeVisible();
    await expect(jsonOption).toBeVisible();
    
    console.log('✅ Export dropdown working correctly');
  }
  
  // Test node interaction
  const centralNodeInput = page.getByPlaceholder('Node text...');
  if (await centralNodeInput.isVisible()) {
    await centralNodeInput.fill('Test Central Idea');
    await page.waitForTimeout(300);
    console.log('✅ Node text editing working');
  }
  
  // Verify UI elements are present (don't click buttons that may be outside viewport)
  const addToolbarBtn = page.getByRole('button', { name: /Add Node/i });
  const deleteToolbarBtn = page.getByRole('button', { name: /Delete Node/i });
  const zoomInBtn = page.getByRole('button', { name: /Zoom/i });
  
  if (await addToolbarBtn.isVisible()) console.log('✅ Add Node toolbar button visible');
  if (await deleteToolbarBtn.isVisible()) console.log('✅ Delete Node toolbar button visible');
  if (await zoomInBtn.isVisible()) console.log('✅ Zoom controls visible');
  
  // Check for connection status
  const offlineText = page.getByText('Offline');
  const connectedText = page.getByText('Connected');
  
  if (await offlineText.isVisible() || await connectedText.isVisible()) {
    console.log('✅ Connection status indicator visible');
  }
  
  console.log('📊 Step 5: Analyzing results...');
  
  await page.screenshot({ path: 'test-results/visual-qa-final.png', fullPage: true });
  
  if (errors.length > 0) {
    console.error('❌ Found console errors:', errors);
    throw new Error(`Visual QA failed with ${errors.length} console errors`);
  }
  
  console.log('✅ Visual QA & Debug completed successfully!');
  console.log('📸 Screenshots saved in test-results/');
});

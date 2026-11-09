import { test, expect } from '@playwright/test';

test.describe('Flutter InAppWebView Native Auth Session Integration', () => {
  test('should invoke getNativeAuthSession handler when running inside Flutter InAppWebView', async ({ page }) => {
    await page.addInitScript(() => {
      (window as unknown as { __flutter_handler_calls: string[] }).__flutter_handler_calls = [];
      (window as unknown as { flutter_inappwebview: { callHandler: (handler: string) => Promise<unknown> } }).flutter_inappwebview = {
        callHandler: (handler: string) => {
          (window as unknown as { __flutter_handler_calls: string[] }).__flutter_handler_calls.push(handler);
          // Return mock session
          return Promise.resolve({
            idToken: 'mock-test-id-token',
            accessToken: 'mock-test-access-token',
          });
        },
      };
    });

    await page.goto('/analytics');

    // Wait and verify that getNativeAuthSession was queried
    await page.waitForFunction(() => {
      const calls = (window as unknown as { __flutter_handler_calls?: string[] }).__flutter_handler_calls;
      return calls && calls.includes('getNativeAuthSession');
    });

    const handlerCalls = await page.evaluate(() => {
      return (window as unknown as { __flutter_handler_calls?: string[] }).__flutter_handler_calls;
    });

    expect(handlerCalls).toContain('getNativeAuthSession');
  });

  test('should handle flutterInAppWebViewPlatformReady event when injected asynchronously', async ({ page }) => {
    await page.goto('/analytics');

    const result = await page.evaluate(() => {
      let queried = false;
      (window as unknown as { flutter_inappwebview: { callHandler: (handler: string) => Promise<unknown> } }).flutter_inappwebview = {
        callHandler: (handler: string) => {
          if (handler === 'getNativeAuthSession') {
            queried = true;
          }
          return Promise.resolve(null);
        },
      };

      // Dispatch event as Flutter InAppWebView does when platform is ready
      window.dispatchEvent(new Event('flutterInAppWebViewPlatformReady'));
      return new Promise<boolean>((resolve) => {
        setTimeout(() => resolve(queried), 200);
      });
    });

    expect(result).toBe(true);
  });
});

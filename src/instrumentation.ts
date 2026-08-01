export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log("[Instrumentation] Registering Next.js background self-scheduler for Psicologia Practica...");
    
    try {
      const { exec } = await import('child_process');
      const path = await import('path');
      
      const checkAndRunCron = () => {
        console.log(`[Self-Scheduler] Triggering article generation check...`);
        
        // Execute the script in a child process
        const scriptPath = path.join(process.cwd(), 'scripts/generateDailyArticles.mjs');
        exec(`node ${scriptPath}`, (error, stdout, stderr) => {
          if (error) {
            console.error(`[Self-Scheduler] Error executing generateDailyArticles: ${error.message}`);
            return;
          }
          console.log(`[Self-Scheduler] Output:\n${stdout}`);
          if (stderr) {
            console.error(`[Self-Scheduler] Stderr:\n${stderr}`);
          }
        });
      };
      
      // Run immediate check on startup (with 45s delay to let server boot up completely)
      setTimeout(() => {
        checkAndRunCron();
      }, 45000);
      
      // Repeat the check every 15 minutes
      setInterval(() => {
        checkAndRunCron();
      }, 15 * 60 * 1000);

    } catch (err: any) {
      console.error("[Instrumentation] Failed to start self-scheduler:", err.message);
    }
  }
}

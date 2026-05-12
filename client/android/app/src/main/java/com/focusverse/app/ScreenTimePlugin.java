package com.focusverse.app;

import android.app.AppOpsManager;
import android.content.Context;
import android.content.Intent;
import android.os.Process;
import android.provider.Settings;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "ScreenTime")
public class ScreenTimePlugin extends Plugin {

    @PluginMethod
    public void checkPermission(PluginCall call) {
        Context context = getContext();
        AppOpsManager appOps = (AppOpsManager) context.getSystemService(Context.APP_OPS_SERVICE);
        int mode = appOps.checkOpNoThrow(AppOpsManager.OPSTR_GET_USAGE_STATS, 
                                        Process.myUid(), context.getPackageName());
        
        boolean granted = (mode == AppOpsManager.MODE_ALLOWED);
        
        JSObject ret = new JSObject();
        ret.put("granted", granted);
        call.resolve(ret);
    }

    @PluginMethod
    public void requestPermission(PluginCall call) {
        Intent intent = new Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS);
        getContext().startActivity(intent);
        call.resolve();
    }

    @PluginMethod
    public void checkOverlayPermission(PluginCall call) {
        boolean granted = Settings.canDrawOverlays(getContext());
        JSObject ret = new JSObject();
        ret.put("granted", granted);
        call.resolve(ret);
    }

    @PluginMethod
    public void requestOverlayPermission(PluginCall call) {
        Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION);
        getContext().startActivity(intent);
        call.resolve();
    }
}

public override bool ContinueUserActivity(UIApplication application, NSUserActivity userActivity, UIApplicationRestorationHandler completionHandler)
{
    CheckForAppLink(userActivity);
    return true;
}

public override void UserActivityUpdated(UIApplication application, NSUserActivity userActivity)
{
    CheckForAppLink(userActivity);
}
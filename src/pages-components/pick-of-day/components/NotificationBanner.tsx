import { Bell } from "lucide-react";

import { Card, CardContent } from "@/shared/components/card";
import { Badge } from "@/shared/components/badge";

export const NotificationBanner = () => (
  <Card className="mb-8 border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5">
    <CardContent className="py-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Bell className="h-5 w-5 text-primary" />
          <span className="text-foreground">
            Get notified instantly when new picks drop
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-background/50">
            Email: On
          </Badge>
          <Badge
            variant="outline"
            className="bg-background/50 text-muted-foreground"
          >
            SMS: Off
          </Badge>
        </div>
      </div>
    </CardContent>
  </Card>
);

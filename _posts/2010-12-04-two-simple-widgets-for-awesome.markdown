---
layout: post
title: Two simple widgets for awesome
tags:
 - awesome
 - Lua
 - Linux
summary: I'll upload my configuration in case my laptop gets hit by a truck.
---

The two widgets next to the system tray:

<div class="img center">
  <a href="/media/images/random/awesome-widgets.png">
    <img src="/media/images/random/awesome-widgets.png"/>
  </a>
</div>

Battery monitor
---------------

This one is pretty simple, based on [this wiki
page](http://awesome.naquadah.org/wiki/Acpitools-based_battery_widget)
(requires ``acpitools``):

{% highlight lua %}
-- Hex converter, for RGB colors
function hex(inp)
    return inp > 16 and string.format("%X", inp) or string.format("0%X", inp)
end

-- Battery monitor
mybattmon = widget({ type = "textbox", name = "mybattmon", align = "right" })
function battery_status ()
    local output={} -- output buffer
    local fd=io.popen("acpitool -b", "r") -- list present batteries
    local line=fd:read()
    while line do -- there might be several batteries
        local battery_num = string.match(line, "Battery \#(%d+)")
        local battery_load = string.match(line, " (%d*)\.%d+%%")
        local time_rem = string.match(line, "(%d+\:%d+)\:%d+")
        if battery_num and battery_load and time_rem then
            table.insert(output, "<span color=\"#"
                .. hex(170 * (100 - tonumber(battery_load)) / 100)
                .. hex(170 * tonumber(battery_load) / 100)
                .. "00\">" .. time_rem .. " " .. battery_load .. "%</span>")
        elseif battery_num and battery_load then -- remaining time unavailable
            table.insert(output, "<span color=\"#00AA00\">" .. battery_load.."%</span>")
        end
        line=fd:read() -- read next line
    end
    return table.concat(output," ")
end
mybattmon.text = " " .. battery_status() .. " "
my_battmon_timer=timer({timeout=17})
my_battmon_timer:add_signal("timeout", function()
    mybattmon.text = " " .. battery_status() .. " "
end)
my_battmon_timer:start()
{% endhighlight %}

The nice thing about it is that it changes its color dynamically (and
linearly). ``0%`` battery = ``#FF0000``, ``100%`` = ``#00FF00``.


CPU temperature monitor
-----------------------

Based on the same code, looks very similar to the battery widget:

{% highlight lua %}
-- Heat monitor
myheatmon = widget({ type = "textbox", name = "myheatmon", align = "right" })
function heat_status ()
    local output = {} -- output buffer
    local fd = io.popen("acpitool -t", "r") -- list present thermal zones
    local line = fd:read()
    while line do -- there might be several thermal zones
        local heat_num = string.match(line, "Thermal zone (%d+)")
        local heat_load = string.match(line, "(%d+) C")
        if heat_num and heat_load then
            table.insert(output, "<span color=\"#"
                .. hex(255 * tonumber(heat_load) / 105)
                .. hex(255 * (105 - tonumber(heat_load)) / 105)
                .. "00\">" .. heat_load .. "&#8451;</span>")
        end
        line=fd:read() -- read next line
    end
    return table.concat(output," ")
end
myheatmon.text = heat_status() .. " "
my_heatmon_timer = timer({timeout = 19})
my_heatmon_timer:add_signal("timeout", function()
    myheatmon.text = heat_status() .. " "
end)
my_heatmon_timer:start()
{% endhighlight %}

For example usage, have a look at my custom ``rc.lua``
[here](/downloads/lua/rc.lua).

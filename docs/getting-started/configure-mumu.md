---
title: Configure MuMu
---

# Configure MuMu

Configure MuMu before connecting it to Microbe Studio.

## Network settings

Open MuMu settings and check the network configuration.

![Open MuMu settings](/img/getting-started/setup-mumu/04-settings-entry.webp)

In **Network**, select **Install Driver** if the driver is not installed.

![MuMu network settings](/img/getting-started/setup-mumu/05-network-settings.webp)

![Network tab](/img/getting-started/setup-mumu/06-network-tab.webp)

For **Bridged network adapter**, choose the adapter that matches your connection:

- **Realtek WiFi** if the machine uses Wi-Fi.
- **Realtek PCIe GbE Family Controller** if the machine uses a wired LAN connection.

![Choose bridged adapter](/img/getting-started/setup-mumu/07-bridged-adapter.webp)

## VT virtualization

Check whether virtualization technology (**VT**) is enabled on the machine.

![VT status](/img/getting-started/setup-mumu/08-vt-status.webp)

If VT is disabled, follow MuMu's official guide:

https://www.mumuplayer.com/vi/help/win/enable-vt.html

If setup gets stuck, create a support ticket in Discord so the team can help.

## Performance settings

For the **Performance** settings, use:

- **CPU**: 2 cores
- **RAM**: 2 GB

![CPU setting](/img/getting-started/setup-mumu/09-performance-cpu.webp)

![RAM setting](/img/getting-started/setup-mumu/10-performance-memory.webp)

## Display settings

For **Display**, use:

- **Resolution**: 1280x720
- **DPI**: 240
- **Maximum FPS**: 30

These settings help flows behave consistently across machines.

![Display resolution and FPS](/img/getting-started/setup-mumu/11-display-resolution-fps.webp)

## Sound and restart

If you run many emulator instances, enable **Disable System Sound** to reduce unnecessary load.

![Disable system sound](/img/getting-started/setup-mumu/12-disable-system-sound.webp)

After changing the settings, restart the emulator so the changes apply.

![Restart emulator](/img/getting-started/setup-mumu/13-restart-emulator.webp)

## Copy an instance

If you need multiple emulator instances with the same configuration, use MuMu's **Copy** action.

![Copy instance entry](/img/getting-started/setup-mumu/14-copy-instance-entry.webp)

![Copy instance options](/img/getting-started/setup-mumu/15-copy-instance-options.webp)

![Copied instance](/img/getting-started/setup-mumu/16-copy-instance-created.webp)


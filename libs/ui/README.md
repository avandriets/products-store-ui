# ui

This library was generated with [Nx](https://nx.dev).

## Running unit tests

Run `nx test ui` to execute the unit tests.


## How to use popover

```

      const data: DataPopover = {
        someData,
        id: someId,
      };

      const pointer = {
        x: event.x,
        y: event.y,
      };

      this.popoverSubscription?.unsubscribe();
      this.popoverSubscription = this.popover
        .openPopover(pointer, { data: data }, VisualisationPopoverComponent)
        .afterClosed()
        .subscribe();

```

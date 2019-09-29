import { observer } from 'mobx-react';
import React, { ComponentType, Component } from 'react';

interface IScrollAware {
  onBottomReached: () => void;
  bottomMargin?: number;
}

export default <ComponentProps extends {}>(
  ComponentToExtend: ComponentType<ComponentProps>,
) =>
  observer(
    class extends Component<IScrollAware & ComponentProps> {
      public static defaultProps: Partial<IScrollAware> = {
        bottomMargin: 300,
      };

      protected loading: boolean = false;

      public componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
      }

      public componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
      }

      public render() {
        const { onBottomReached, bottomMargin, ...props } = this.props as IScrollAware;
        const componentProps = props as ComponentProps;
        return <ComponentToExtend {...componentProps} />;
      }

      protected onScroll = async () => {
        if (
          !this.loading &&
          window.innerHeight + window.scrollY >=
            document.body.offsetHeight - this.props.bottomMargin!
        ) {
          this.loading = true;
          await this.props.onBottomReached();
          this.loading = false;
        }
      };
    },
  );

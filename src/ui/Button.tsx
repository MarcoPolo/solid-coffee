export default (props: { onClick: () => void; children: any }) => (
  <mwc-button onClick={(props.onClick)} raised={true}>{(props.children)}</mwc-button>
);
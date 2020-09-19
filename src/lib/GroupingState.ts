/** name은 hookS에 들어가는 것과 이름이 무조건 같아야합니다.
 * 또한, Hooks State의 구조가 name, setName으로 되어있어야 가능한 로직입니다. */
const GroupingState = (
	name: string,
	hookS: any,
	setHookS: (arg1: any) => void
) => {
	const nameSet = 'set' + (name.charAt(0).toUpperCase() + name.slice(1));

	const objData: any = new Object();

	objData[`${name}`] = hookS;
	objData[`${nameSet}`] = setHookS;

	return objData;
};

export default GroupingState;

import useFetch from '../../../../components/hooks/useFetch';
import { API_URL } from '../../../../utils/config';
import '../newHotel.scss'

const FullDescription = (props) => {

    const { data } = useFetch(`${API_URL}/api/rooms`);
    return (
        <>
            {data &&
                <div className="descriptionArea">
                    <label>Description</label>
                    <textarea
                        id="description"
                        type="text"
                        placeholder="Full hotel description"
                        onChange={props.handleChange}
                    />
                </div>
            }
        </>
    )
}

export default FullDescription
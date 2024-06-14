import { TagsInput } from 'react-tag-input-component'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    addRelease,
    editRelease,
    getCollection,
} from '../store/features/releaseSlice'
import { InputField } from './InputField'

export const CollectionForm = ({ type, release, handleClose }) => {
    const [cover, setCover] = useState('')
    const [title, setTitle] = useState('')
    const [artist, setArtist] = useState('')
    const [genres, setGenres] = useState([])
    const [year, setYear] = useState('')
    const [label, setLabel] = useState('')
    const [format, setFormat] = useState('')
    const { newRelease } = useSelector(state => state.release)

    const dispatch = useDispatch()

    useEffect(() => {
        if (type === 'edit') {
            setTitle(release.title)
            setArtist(release.artist)
            setGenres(release.genres.split(','))
            setYear(release.year)
            setLabel(release.label)
            setFormat(release.format)
        }
        if (newRelease) {
            handleClose()
        }
    }, [newRelease, handleClose])

    const handleSubmit = e => {
        e.preventDefault()
        try {
            const data = new FormData()
            data.append('cover', cover)
            data.append('title', title)
            data.append('artist', artist)
            data.append('genres', genres)
            data.append('year', year)
            data.append('label', label)
            data.append('format', format)
            if (type === 'addRelease') {
                dispatch(addRelease(data))
            }
            if (type === 'edit') {
                data.append('releaseId', release._id)
                const editData = new FormData()
                for (const [key, value] of data.entries()) {
                    if (value !== '') editData.append(key, value)
                }
                dispatch(editRelease(editData))
                handleClose()
            }
            dispatch(getCollection())
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form
            className='p-6 w-full mx-auto'
            onSubmit={e => {
                e.preventDefault()
            }}
        >
            <label className='py-2 bg-gray-200/70  mt-5 flex items-center justify-center hover:bg-gray-200 transition-all duration-200 cursor-pointer'>
                Прикрепить изображение
                <input
                    type='file'
                    className='hidden'
                    onChange={e => setCover(e.target.files[0])}
                />
            </label>
            <div className='flex justify-center max-w-full pt-1'>
                {cover && <img src={URL.createObjectURL(cover)} alt='cover' />}
            </div>
            <div className='flex flex-col gap-2'>
                <label>
                    <InputField
                        type='text'
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder='Название релиза'
                    />
                </label>
                <label>
                    <InputField
                        type='text'
                        value={artist}
                        onChange={e => setArtist(e.target.value)}
                        placeholder='Исполнитель'
                    />
                </label>
                <label>
                    <TagsInput
                        placeHolder={'Введите жанр и нажмите Enter'}
                        value={genres}
                        onChange={setGenres}
                    />
                </label>
                <div className='flex gap-3 justify-between items-center mb-5'>
                    <label>
                        <InputField
                            value={year}
                            onChange={e => setYear(e.target.value)}
                            type='text'
                            placeholder='Год'
                        />
                    </label>
                    <label>
                        <InputField
                            value={label}
                            onChange={e => setLabel(e.target.value)}
                            type='text'
                            placeholder='Лейбл'
                        />
                    </label>
                    <label>
                        <InputField
                            value={format}
                            onChange={e => setFormat(e.target.value)}
                            type='text'
                            placeholder='Формат'
                        />
                    </label>
                </div>
            </div>
            <div className='flex justify-center'>
                <button
                    className='px-6 py-2 bg-blue-400 transition-all duration-[375ms] text-white font-semibold rounded-xl shadow-md hover:bg-blue-500 focus:outline-none hover:scale-105'
                    onClick={handleSubmit}
                >
                    {type === 'edit' && 'Редактировать'}
                    {type === 'addRelease' && 'Добавить'}
                </button>
            </div>
        </form>
    )
}

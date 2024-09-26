import { useForm, useWatch } from "react-hook-form"
import { SegmentFormType } from "../types/segmentFormType"
import { Schema, schemaKeys, schemaMapping } from "../types/schemaType"
import { useMemo, useState } from "react"

export default function SegmentForm() {
    const {
        reset,
        control,
        setValue,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SegmentFormType>({ defaultValues: { segment_name: '', schema: {} } })
    const schema = useWatch({
        control: control,
        name: 'schema',
        defaultValue: {}
    })
    const availableSchemaKeys = useMemo(() => {
        const usedSchemaKeys = new Set(Object.keys(schema))
        return schemaKeys.filter(schema => !usedSchemaKeys.has(schema))
    }, [schema])
    const [selectCount, setSelectCount] = useState(1)
    const [selectedSchema, setSelectedSchema] = useState<string[]>([])
    return (
        <form method="dialog" onSubmit={handleSubmit(async (data) => {
            await fetch(
                "https://webhook.site/7867e227-64b1-48e2-ae35-0ce0d4cc527c",
                {
                    method: 'POST',
                    body: JSON.stringify(data),
                    mode: "no-cors"
                }

            )
            reset()
            setValue("schema", {})
            setSelectedSchema([])
        })}>
            <div className="formSection">
                <label >Enter name of Segment</label>
                <input {...register('segment_name')} required placeholder='Name of the Segment' />
                <span>{errors.segment_name?.message ?? ''}</span>
            </div>
            {
                schemaKeys.map((_val, index) => {
                    return (

                        <div
                            key={index}
                            style={{ display: `${index < selectCount ? 'flex' : 'none'}` }}
                            className="selectContainer"
                        >
                            <select
                                disabled={selectedSchema[index] !== undefined}
                                defaultValue={selectedSchema[index]}
                                onChange={(event) => {
                                    setSelectedSchema(prev => [...prev, event.target.value])
                                    setValue(`schema.${event.target.value}` as keyof SegmentFormType, schemaMapping[event.target.value as keyof Schema])
                                }}>

                                {
                                    selectedSchema[index] ?
                                        (<option key={index} value={selectedSchema[index]}>{schemaMapping[selectedSchema[index] as keyof Schema] ?? selectedSchema[index]}</option>) :
                                        (<>
                                            <option>Add schema to segment</option>
                                            {
                                                availableSchemaKeys.map((key) => (
                                                    <option key={key} value={key}>{schemaMapping[key as keyof Schema] ?? selectedSchema[index]}</option>
                                                ))
                                            }
                                        </>)

                                }
                            </select>
                            <button type='button' onClick={() => {
                                const updatedSchema = Object.keys(schema)
                                    .filter(key => key !== selectedSchema[index])
                                    .reduce((obj, key) => {
                                        obj[key as keyof Schema] = schema[key as keyof Schema]
                                        return obj
                                    }, {} as Partial<Record<typeof schemaKeys[number], string>>)
                                setValue('schema', updatedSchema)
                                setSelectedSchema(prev => {
                                    const list = Array.from(prev)
                                    list.splice(index, 1)
                                    return list
                                })
                                setSelectCount(prev => prev === 1 ? prev : prev - 1)
                            }} >X</button>
                        </div>
                    )
                })
            }
            <button
                type="button"
                disabled={availableSchemaKeys.length === 0}
                onClick={() => {
                    if (selectCount < availableSchemaKeys.length)
                        setSelectCount(prev => prev + 1)
                }}
            >+ Add new schema</button>
            <button id="submitBtn">Submit</button>
        </form>
    )
}
'use-client'

import * as ProjectService from '@/services/project.service';
import { CatalogProject, ProjectType } from '@/types/project.entities';
import { Button, Divider, Form, Input, InputRef, Modal, Select, Space, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import _ from 'lodash';
import React, { useEffect, useRef, useState } from 'react';
import { FaPen } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import "./modal-create-project.style.scss";
import { DefaultOptionType } from 'antd/es/select';
import * as CategoryService from '@/services/category.service';
import { PlusOutlined } from '@ant-design/icons';
import UploadFile from '@/components/upload-file/upload-file';

interface IModalCreateProject {
    valueModal?: ProjectType;
    fetchDataProjects: () => Promise<void>
}

const ModalCreateProject: React.FC<IModalCreateProject> = ({
    valueModal,
    fetchDataProjects
}) => {
    const [form] = useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [openCreate, setOpenCreate] = useState<boolean>(false);
    const [categoryOptions, setCategoryOptions] = useState<DefaultOptionType[]>([]);
    const [memberOfTeamDesign, setMemberOfTeamDesign] = useState<string[]>(['Nguyễn Văn A', 'Nguyễn Văn B']);
    const [nameMember, setNameMember] = useState<string>('');
    const inputRef = useRef<InputRef>(null);
    const [files, setFiles] = useState<string[]>([]);

    const addItem = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
        e.preventDefault();
        if (nameMember) {
            setMemberOfTeamDesign([...memberOfTeamDesign, nameMember]);
            setNameMember('');
            setTimeout(() => {
                inputRef.current?.focus();
            }, 0);
        }
    };

    const handleFinishForm = async (value: any) => {
        try {
            let response = null;
            if (!_.isEmpty(valueModal)) {
                response = await ProjectService.updateProject(valueModal._id, { ...value, categoryId: value.category, images: files });
            } else {
                response = await ProjectService.createProject({ ...value, categoryId: value.category, images: files });
            }
            if (response) {
                fetchDataProjects()
                messageApi.open({
                    type: 'success',
                    content: !_.isEmpty(valueModal) ? 'Cập nhật thành công' : 'Thêm mới thành công',
                });
                setOpenCreate(false)
            }
        } catch (error: any) {
            console.log(error)
            messageApi.open({
                type: 'error',
                content: !_.isEmpty(valueModal) ? 'Cập nhật thất bại' : 'Thêm mới thất bại',
            });
        }
    };

    useEffect(() => {
        if (openCreate) {
            form.resetFields();
            setFiles([]);
            if (valueModal) {
                form.setFieldsValue({ ...valueModal, category: valueModal?.category?._id });
            }
            const fetchDataCategories = async () => {
                try {
                    const resCategories = await CategoryService.getAllCategories()
                    if (resCategories) {
                        setCategoryOptions(
                            resCategories?.data.data?.map((category: CatalogProject) => ({
                                label: category?.name,
                                value: category?._id
                            }))
                        );
                    }
                } catch (error: any) {
                    console.log(error)
                }
            }
            fetchDataCategories()
        }
    }, [openCreate]);

    return (
        <div className='create-project-wrap'>
            {contextHolder}
            <div onClick={() => setOpenCreate(true)}>
                {!_.isEmpty(valueModal) ? (
                    <FaPen className={`icon-edit cursor-pointer text-[#1677ff]`} />
                ) : (
                    <Button
                        type="primary"
                        icon={<IoMdAdd className='text-white' />}
                    >
                        Thêm mới
                    </Button>
                )}
            </div>
            <Modal
                destroyOnClose
                maskClosable={false}
                width={800}
                open={openCreate}
                title={
                    <div className="mx-[-20px] mt-[-8px] border-b bg-white pb-[10px]">
                        <span className="px-[20px] text-[18px] font-medium text-[#1A2240]">
                            {!_.isEmpty(valueModal) ? 'Cập nhật dự án' : 'Thêm dự án'}
                        </span>
                    </div>
                }
                onCancel={() => setOpenCreate(false)}
                closeIcon={false}
                className={'modal-form-project'}
                footer={
                    <div className="action-button mx-[-20px] border-t bg-white pt-[16px]">
                        <div className="flex items-center justify-end gap-[20px] px-[20px]">
                            <Button
                                type="primary"
                                danger
                                onClick={() => setOpenCreate(false)}
                            >
                                Hủy
                            </Button>
                            <Button
                                key="submit"
                                htmlType="submit"
                                type="primary"
                            >
                                {!_.isEmpty(valueModal) ? 'Cập nhật' : 'Xác nhận'}
                            </Button>
                        </div>
                    </div>
                }
                modalRender={(children) => (
                    <Form layout="vertical" onFinish={handleFinishForm} form={form} initialValues={{
                        ...valueModal, category: valueModal?.category?._id
                    }}>
                        {children}
                    </Form>
                )}
            >
                <div className="content-modal mx-[-20px] flex flex-col gap-8 bg-[#F7F8FA] p-[20px]">
                    <div>
                        <div className='grid grid-cols-3 gap-x-8'>
                            <Form.Item
                                label="Tên dự án"
                                name="projectName"
                                rules={[{ required: true, message: "Nhập vào tên dự án" }]}
                            >
                                <Input placeholder='Tên dự án' allowClear />
                            </Form.Item>
                            <Form.Item
                                label="Địa điểm"
                                name="projectLocation"
                            >
                                <Input placeholder='Địa điểm' allowClear />
                            </Form.Item>
                            <Form.Item
                                label="Diện tích"
                                name="projectAcreage"
                            >
                                <Input placeholder='Diện tích' allowClear />
                            </Form.Item>
                            <Form.Item
                                label="Thiết kế"
                                name="designTeam"
                            >
                                <Select
                                    mode="multiple"
                                    allowClear
                                    placeholder='Thiết kế'
                                    options={memberOfTeamDesign.map((item) => ({ label: item, value: item }))}
                                    dropdownRender={(menu) => (
                                        <>
                                            {menu}
                                            <Divider style={{ margin: '8px 0' }} />
                                            <Space style={{ padding: '0 8px 4px' }}>
                                                <Input
                                                    allowClear
                                                    placeholder="Nhập thành viên"
                                                    ref={inputRef}
                                                    value={nameMember}
                                                    onChange={((event: React.ChangeEvent<HTMLInputElement>) => {
                                                        setNameMember(event.target.value)
                                                    })}
                                                    onKeyDown={(e) => e.stopPropagation()}
                                                />
                                                <Button type="text" icon={<PlusOutlined />} onClick={addItem} disabled={!!!nameMember} className={`${!!!nameMember && 'cursor-not-allowed'}`} />
                                            </Space>
                                        </>
                                    )}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Khách hàng"
                                name="customer"
                                rules={[{ required: true, message: "Nhập vào khách hàng" }]}
                            >
                                <Input placeholder='Khách hàng' allowClear />
                            </Form.Item>
                            <Form.Item
                                label="Danh mục"
                                name="category"
                                rules={[{ required: true, message: "Nhập vào danh mục" }]}
                            >
                                <Select placeholder="Danh mục" options={categoryOptions} />
                            </Form.Item>
                        </div>
                        <Form.Item name="description" label="Mô tả">
                            <Input.TextArea rows={6} placeholder='Mô tả' />
                        </Form.Item>
                        <UploadFile
                            setFiles={setFiles}
                            files={files}
                        />
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ModalCreateProject 
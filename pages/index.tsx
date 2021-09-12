import React, { useState } from 'react'

import { 
  Layout, 
  Breadcrumb, 
  Collapse, 
  Form, 
  Radio,
  Row,
  Col,
  Card,
  Statistic,
  Descriptions
} from 'antd';
import { CaretRightOutlined, ArrowUpOutlined } from '@ant-design/icons';

import styles from './styles/index.module.css';

import HeaderComponent from './components/Header';
import FooterComponent from './components/Footer';

import comorbidades from './api/comorbidades.json';
import dadosInternacao from './api/dadosInternacao.json';
import motivoAdmissao from './api/motivoAdmissao.json';
import variaveis from './api/variaveis.json';

const { Content } = Layout;
const { Panel } = Collapse;

const Home = () => {
  const [form] = Form.useForm();

  return (
    <>
      <Layout className={styles.layout}> 
        <HeaderComponent />
        

        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0'}}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>Escore Fisiológico Agudo Simplificado</Breadcrumb.Item>
          </Breadcrumb>

          
          <Layout 
            className={styles.layoutBackground}
            style={{ padding: '24px 0' }}
          >
            <Content
              className={styles.layoutBackground}
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Collapse
                defaultActiveKey={['1']}
                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
              >
                <Panel header="Dados da Internação" key="1">
                  <Form
                    form={form}
                  >
                    <Descriptions bordered>
                      {dadosInternacao.map((item) =>
                        <Descriptions.Item label={item.formLabel} key={item.key} span={3}>
                          <Form.Item key={item.key} name={item.formName}>  
                            <Radio.Group buttonStyle="solid">
                              {item.respostas.map((resposta) =>
                                <Radio.Button 
                                  key={resposta.key}
                                  value={resposta.value}
                                >
                                  {resposta.label}
                                </Radio.Button>  
                              )}
                            </Radio.Group>
                          </Form.Item>
                        </Descriptions.Item>
                      )}
                    </Descriptions>
                    
                    
                  </Form>
                </Panel>
                
                <Panel header="Comorbidades" key="2">
                  <Form
                    form={form}
                  >
                    <Descriptions bordered>
                      {comorbidades.map((item) =>
                        <Descriptions.Item label={item.formLabel} key={item.key} span={3}>
                          <Form.Item key={item.key} name={item.formName}>  
                            <Radio.Group buttonStyle="solid">
                              {item.respostas.map((resposta) =>
                                <Radio.Button 
                                  key={resposta.key}
                                  value={resposta.value}
                                >
                                  {resposta.label}
                                </Radio.Button>  
                              )}
                            </Radio.Group>
                          </Form.Item>
                        </Descriptions.Item>
                      )}
                    </Descriptions>
                  </Form>
                </Panel>
                <Panel header="Motivo da admissão" key="3">
                  <Form
                    form={form}
                  >
                    <Descriptions bordered>
                      {motivoAdmissao.map((item) =>
                        <Descriptions.Item label={item.formLabel} key={item.key} span={3}>
                          <Form.Item key={item.key} name={item.formName}>  
                            <Radio.Group buttonStyle="solid">
                              {item.respostas.map((resposta) =>
                                <Radio.Button 
                                  key={resposta.key}
                                  value={resposta.value}
                                >
                                  {resposta.label}
                                </Radio.Button>  
                              )}
                            </Radio.Group>
                          </Form.Item>
                        </Descriptions.Item>
                      )}
                    </Descriptions>
                  </Form>
                </Panel>
                <Panel header="Variáveis" key="4">
                <Form
                    form={form}
                  >
                    <Descriptions bordered>
                      {variaveis.map((item) =>
                        <Descriptions.Item label={item.formLabel} key={item.key} span={3}>
                          <Form.Item key={item.key} name={item.formName}>  
                            <Radio.Group buttonStyle="solid">
                              {item.respostas.map((resposta) =>
                                <Radio.Button 
                                  key={resposta.key}
                                  value={resposta.value}
                                >
                                  {resposta.label}
                                </Radio.Button>  
                              )}
                            </Radio.Group>
                          </Form.Item>
                        </Descriptions.Item>
                      )}
                    </Descriptions>
                  </Form>
                </Panel>
              </Collapse>
            </Content>
          </Layout>

          
        </Content>

        <FooterComponent />
      </Layout>
    </>
  )
}

export default (Home)
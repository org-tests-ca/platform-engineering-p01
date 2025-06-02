{{- define "api-ts.name" -}}
api-ts
{{- end }}

{{- define "api-ts.fullname" -}}
{{ .Release.Name }}-{{ include "api-ts.name" . }}
{{- end }}
